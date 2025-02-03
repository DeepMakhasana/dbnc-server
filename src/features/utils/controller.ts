import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import prisma from "../../config/prisma";

export async function createStateCity(req: Request, res: Response, next: NextFunction) {
  try {
    const { state, city } = req.body;

    // Check if state already exists
    let existingState = await prisma.state.findFirst({
      where: { name: state.toLowerCase() },
    });

    if (existingState?.id) {
      // Add new cities to existing state
      await prisma.city.createMany({
        data: city.map((cityName: string) => ({
          name: cityName,
          stateId: existingState?.id,
        })),
        skipDuplicates: true,
      });
    } else {
      // Create new state
      existingState = await prisma.state.create({
        data: {
          name: state,
          city: {
            create: city.map((cityName: string) => ({ name: cityName })),
          },
        },
      });
    }

    res.status(200).json({ message: "State and cities added successfully." });
  } catch (error) {
    console.log(`Error in OTP verify: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in OTP verify."));
  }
}

// category ---------------------------------------------------------------------------------------------------

export async function createCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const value = req.body;

    const category = await prisma.category.create({ data: value });
    res.status(201).json({ message: "Category added successfully.", category });
  } catch (error) {
    console.log(`Error in create category: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in create category."));
  }
}

export async function searchCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const { query } = req.query;

    const categories = await prisma.category.findMany({
      where: {
        name: { contains: String(query), mode: "insensitive" },
      },
    });
    res.status(200).json(categories);
  } catch (error) {
    console.log(`Error in search category: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in search category."));
  }
}

export async function getAllCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json(categories);
  } catch (error) {
    console.log(`Error in get all category: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in get all category."));
  }
}

// ---------------------------------------------------------------------------------------------------------------

// services ---------------------------------------------------------------------------------------------------

export async function createService(req: Request, res: Response, next: NextFunction) {
  try {
    const value = req.body;

    const service = await prisma.service.create({ data: value });
    res.status(201).json({ message: "Service added successfully.", service });
  } catch (error) {
    console.log(`Error in create service: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in create service."));
  }
}

export async function searchService(req: Request, res: Response, next: NextFunction) {
  try {
    const { query } = req.query;

    const services = await prisma.service.findMany({
      where: {
        name: { contains: String(query), mode: "insensitive" },
      },
    });
    res.status(200).json(services);
  } catch (error) {
    console.log(`Error in search services: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in search services."));
  }
}

export async function getAllServiceByCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const { categoryId } = req.params;
    const services = await prisma.service.findMany({
      where: {
        categoryId: Number(categoryId),
      },
    });
    res.status(200).json(services);
  } catch (error) {
    console.log(`Error in get all services: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in get all services."));
  }
}

// ---------------------------------------------------------------------------------------------------------------
