import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import prisma from "../../config/prisma";

export async function createStore(req: Request, res: Response, next: NextFunction) {
  try {
    const value = req.body;

    const store = await prisma.store.create({ data: value });
    res.status(201).json({ message: "Store created successfully.", store });
  } catch (error) {
    console.log(`Error in Store Create: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in Store Create."));
  }
}

export async function getStoreBySlug(req: Request, res: Response, next: NextFunction) {
  try {
    const { slug } = req.params;

    const store = await prisma.store.findUnique({
      where: { slug },
      include: { category: true },
    });

    res.status(200).json(store);
  } catch (error) {
    console.log(`Error in Store Get by slug: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in Store Get by slug."));
  }
}

export async function updateStoreById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const value = req.body;

    const store = await prisma.store.update({
      where: { id: Number(id) },
      data: value,
    });

    res.status(200).json(store);
  } catch (error) {
    console.log(`Error in Store Get by slug: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in Store Get by slug."));
  }
}

export async function deleteStoreById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    await prisma.store.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ message: "Store deleted successfully." });
  } catch (error) {
    console.log(`Error in Store Get by slug: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in Store Get by slug."));
  }
}
