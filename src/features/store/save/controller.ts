import { NextFunction, Response } from "express";
import createHttpError from "http-errors";
import prisma from "../../../config/prisma";
import { RequestWithUser } from "../../../middlewares/auth.middleware";

// store save -------------------------------------------------------------------------------------------------

export async function createStoreSave(req: RequestWithUser, res: Response, next: NextFunction) {
  try {
    const { storeId } = req.body;
    if (!req.user) return next(createHttpError(403, "Access denied"));

    await prisma.saveStore.create({ data: { storeId, userId: req.user.id } });
    res.status(201).json({ message: "store saved successfully" });
  } catch (error) {
    console.log(`Error in create store save: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in create store save."));
  }
}

export async function getAllOwnSavedStore(req: RequestWithUser, res: Response, next: NextFunction) {
  try {
    if (!req.user) return next(createHttpError(403, "Access denied"));

    const savedStores = await prisma.saveStore.findMany({
      where: { userId: req.user.id },
      include: {
        store: {
          select: {
            id: true,
            name: true,
            tagline: true,
            slug: true,
            logo: true,
            storeAddresses: {
              select: {
                city: {
                  select: {
                    name: true,
                  },
                }, // Ensure this field exists if city is a relation
              },
            },
            category: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    res.status(200).json(savedStores);
  } catch (error) {
    console.log(`Error in get all own saved store: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in get all own saved store."));
  }
}

export async function checkSavedOrNot(req: RequestWithUser, res: Response, next: NextFunction) {
  try {
    const { storeId } = req.params;
    if (!req.user) return next(createHttpError(403, "Access denied"));

    const savedStores = await prisma.saveStore.findUnique({
      where: { userId_storeId: { userId: req.user.id, storeId: parseInt(storeId) } },
    });

    if (savedStores) {
      res.status(200).json(true);
    } else {
      res.status(200).json(false);
    }
  } catch (error) {
    console.log(`Error in check saved store: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in check saved store."));
  }
}

export async function deleteSavedStore(req: RequestWithUser, res: Response, next: NextFunction) {
  try {
    const { storeId } = req.params;
    if (!req.user) return next(createHttpError(403, "Access denied"));

    await prisma.saveStore.delete({
      where: { userId_storeId: { userId: req.user.id, storeId: parseInt(storeId) } },
    });

    res.status(200).json({ message: "Store removed from saved list" });
  } catch (error) {
    console.log(`Error in saved store delete: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in saved store delete."));
  }
}

// ---------------------------------------------------------------------------------------------------------------
