import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import prisma from "../../../config/prisma";

// store address -------------------------------------------------------------------------------------------------

export async function createAddress(req: Request, res: Response, next: NextFunction) {
  try {
    const value = req.body;

    const storeAddress = await prisma.storeAddress.create({ data: value });
    res.status(201).json(storeAddress);
  } catch (error) {
    console.log(`Error in create store address: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in create store address."));
  }
}

export async function getStoreAddressById(req: Request, res: Response, next: NextFunction) {
  try {
    const { storeId } = req.params;
    const storeAddresses = await prisma.storeAddress.findUnique({
      where: { storeId: parseInt(storeId) },
      // include: { state: true, city: true },
    });

    res.status(200).json(storeAddresses);
  } catch (error) {
    console.log(`Error in get store address: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in get store address."));
  }
}

export async function updateStoreAddress(req: Request, res: Response, next: NextFunction) {
  try {
    const { storeAddressId } = req.params;
    const value = req.body;

    const storeAddress = await prisma.storeAddress.update({
      where: { id: parseInt(storeAddressId) },
      data: value,
    });

    res.status(200).json(storeAddress);
  } catch (error) {
    console.log(`Error in update store address: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in update store address."));
  }
}

export async function deleteStoreAddress(req: Request, res: Response, next: NextFunction) {
  try {
    const { storeAddressId } = req.params;
    const deleteStoreAddress = await prisma.storeAddress.delete({ where: { id: parseInt(storeAddressId) } });

    res.status(200).json({ message: "Store Address deleted successfully.", deleteStoreAddress });
  } catch (error) {
    console.log(`Error in delete store address: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in delete store address."));
  }
}

// ---------------------------------------------------------------------------------------------------------------
