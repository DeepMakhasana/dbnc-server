import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import prisma from "../../../config/prisma";

// store links -------------------------------------------------------------------------------------------------

export async function createManyLink(req: Request, res: Response, next: NextFunction) {
  try {
    const value = req.body;

    const storeSocialMedias = await prisma.storeSocialMedia.createManyAndReturn({ data: value });
    res.status(201).json(storeSocialMedias);
  } catch (error) {
    console.log(`Error in create store link: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in create store link."));
  }
}

export async function getAllLinkByStore(req: Request, res: Response, next: NextFunction) {
  try {
    const { storeId } = req.params;
    const storeSocialMedias = await prisma.storeSocialMedia.findMany({
      where: { storeId: parseInt(storeId) },
      include: { socialMedia: true },
      orderBy: { index: "asc" },
    });

    res.status(200).json(storeSocialMedias);
  } catch (error) {
    console.log(`Error in get all store link: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in get all store link."));
  }
}

export async function updateLink(req: Request, res: Response, next: NextFunction) {
  try {
    const { storeSocialMediaId } = req.params;
    const value = req.body;

    const storeSocialMedia = await prisma.storeSocialMedia.update({
      where: { id: parseInt(storeSocialMediaId) },
      data: value,
    });

    res.status(200).json({ message: "Store Social Media link updated successfully.", storeSocialMedia });
  } catch (error) {
    console.log(`Error in update store link: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in update store link."));
  }
}

export async function reorderStoreLink(req: Request, res: Response, next: NextFunction) {
  try {
    const { newOrder } = req.body;

    if (!Array.isArray(newOrder)) return next(createHttpError(400, "New order must be an array."));

    await prisma.$transaction(async (prismaTransaction) => {
      newOrder.map(({ id, index }) =>
        prismaTransaction.storeSocialMedia.update({
          where: { id },
          data: { index },
        })
      );
    });

    res.status(200).json({ message: "Store link reordered successfully." });
  } catch (error) {
    console.log(`Error in reorder store link: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in reorder store link."));
  }
}

export async function deleteStoreLink(req: Request, res: Response, next: NextFunction) {
  try {
    const { storeSocialMediaId } = req.params;
    const deleteStoreSocialMedia = await prisma.storeSocialMedia.delete({
      where: { id: parseInt(storeSocialMediaId) },
    });

    res.status(200).json({ message: "Store link deleted successfully.", deleteStoreSocialMedia });
  } catch (error) {
    console.log(`Error in store link delete: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in store link delete."));
  }
}

// ---------------------------------------------------------------------------------------------------------------
