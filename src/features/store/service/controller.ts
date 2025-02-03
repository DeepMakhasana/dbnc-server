import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import prisma from "../../../config/prisma";

// store service -------------------------------------------------------------------------------------------------

export async function createService(req: Request, res: Response, next: NextFunction) {
  try {
    const value = req.body;

    const service = await prisma.service.create({ data: value });
    res.status(201).json({ message: "Service added successfully.", service });
  } catch (error) {
    console.log(`Error in create store service: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in create store service."));
  }
}

export async function getAllServiceByStore(req: Request, res: Response, next: NextFunction) {
  try {
    const { storeId } = req.params;
    const storeServices = await prisma.storeService.findMany({
      where: { storeId: parseInt(storeId) },
      orderBy: { index: "asc" },
      include: { service: true },
    });

    res.status(200).json(storeServices);
  } catch (error) {
    console.log(`Error in get all store services: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in get all store services."));
  }
}

export async function reorderStoreServices(req: Request, res: Response, next: NextFunction) {
  try {
    const { newOrder } = req.body;

    if (!Array.isArray(newOrder)) return next(createHttpError(400, "New order must be an array."));

    await prisma.$transaction(async (prismaTransaction) => {
      newOrder.map(({ id, index }) =>
        prismaTransaction.storeService.update({
          where: { id },
          data: { index },
        })
      );
    });

    res.status(200).json({ message: "Store services reordered successfully." });
  } catch (error) {
    console.log(`Error in reorder store services: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in reorder store services."));
  }
}

export async function deleteStoreService(req: Request, res: Response, next: NextFunction) {
  try {
    const { storeServiceId } = req.params;
    const deleteStoreService = await prisma.storeService.delete({ where: { id: parseInt(storeServiceId) } });

    res.status(200).json({ message: "Store Service deleted successfully.", deleteStoreService });
  } catch (error) {
    console.log(`Error in search services: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in search services."));
  }
}

// ---------------------------------------------------------------------------------------------------------------
