import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import prisma from "../../../config/prisma";

// store service -------------------------------------------------------------------------------------------------

export async function createService(req: Request, res: Response, next: NextFunction) {
  try {
    const value = req.body;

    const service = await prisma.storeService.createManyAndReturn({
      data: value,
      include: { service: { select: { name: true } } },
    });
    console.log("service", service);
    res.status(201).json(service);
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
      include: { service: { select: { name: true } } },
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
    const { deleteIds } = req.body;
    const deleteStoreService = await prisma.storeService.deleteMany({
      where: {
        id: { in: deleteIds },
      },
    });
    console.log("deleteStoreService", deleteStoreService);

    res.status(200).json({ message: "Store Service deleted successfully." });
  } catch (error) {
    console.log(`Error in search services: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in search services."));
  }
}

// ---------------------------------------------------------------------------------------------------------------
