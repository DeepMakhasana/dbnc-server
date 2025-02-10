import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import prisma from "../../../config/prisma";

// store photo -------------------------------------------------------------------------------------------------

export async function createPhotos(req: Request, res: Response, next: NextFunction) {
  try {
    const { storeId, paths } = req.body;

    const lastPhoto = await prisma.storePhoto.findFirst({
      where: { storeId },
      orderBy: { index: "desc" },
    });

    let startIndex = lastPhoto ? lastPhoto.index + 1 : 1;

    const createdPhotos = await prisma.storePhoto.createManyAndReturn({
      data: paths.map((path: string, i: number) => ({
        storeId,
        path,
        index: startIndex + i,
      })),
    });
    res.status(201).json(createdPhotos);
  } catch (error) {
    console.log(`Error in create photos: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in create photos."));
  }
}

export async function getAllPhotoByStore(req: Request, res: Response, next: NextFunction) {
  try {
    const { storeId } = req.params;
    const storePhotos = await prisma.storePhoto.findMany({
      where: { storeId: parseInt(storeId) },
      orderBy: { index: "asc" },
    });

    res.status(200).json(storePhotos);
  } catch (error) {
    console.log(`Error in get all store photos: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in get all store photos."));
  }
}

export async function reorderStorePhotos(req: Request, res: Response, next: NextFunction) {
  try {
    const { newOrder } = req.body;

    if (!Array.isArray(newOrder)) return next(createHttpError(400, "New order must be an array."));

    await prisma.$transaction(async (prismaTransaction) => {
      newOrder.map(({ id, index }) =>
        prismaTransaction.storePhoto.update({
          where: { id },
          data: { index },
        })
      );
    });

    res.status(200).json({ message: "Photos reordered successfully" });
  } catch (error) {
    console.log(`Error in reorder store photo: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in reorder store photo."));
  }
}

export async function deleteStorePhoto(req: Request, res: Response, next: NextFunction) {
  try {
    const { photoId } = req.params;
    const deletedPhoto = await prisma.storePhoto.delete({
      where: { id: parseInt(photoId) },
    });

    res.status(200).json({ message: "Photo deleted successfully", deletedPhoto });
  } catch (error) {
    console.log(`Error in delete photo: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in search photo."));
  }
}

// ---------------------------------------------------------------------------------------------------------------
