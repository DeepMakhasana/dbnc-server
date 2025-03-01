import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import prisma from "../../config/prisma";
import { getAIResponse } from "../../services/openai";

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

export async function getAllState(req: Request, res: Response, next: NextFunction) {
  try {
    const states = await prisma.state.findMany();
    res.status(200).json(states);
  } catch (error) {
    console.log(`Error in OTP verify: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in OTP verify."));
  }
}

export async function getCityByStateId(req: Request, res: Response, next: NextFunction) {
  try {
    const { stateId } = req.params;

    const city = await prisma.city.findMany({
      where: { stateId: Number(stateId) },
      select: {
        id: true,
        name: true,
      },
    });
    if (!city) return next(createHttpError(400, { message: "No cities found for this state." }));

    res.status(200).json(city);
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
    res.status(201).json(category);
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
    res.status(201).json({ id: service.id, name: service.name });
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
      select: {
        id: true,
        name: true,
      },
    });
    console.log("getServicesByCategory: ", services);
    res.status(200).json(services);
  } catch (error) {
    console.log(`Error in get all services: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in get all services."));
  }
}

// ---------------------------------------------------------------------------------------------------------------

// openai suggestion -----------------------------------------------------------------------------------------------------
export async function suggestServicesByCategory(req: Request, res: Response, next: NextFunction) {
  try {
    console.log(req.query);
    const { name, categoryId } = req.query;
    if (!name || !categoryId)
      return next(createHttpError(400, "provide business name and category in query parameter and services in body"));

    const businessName = decodeURI(name as string);
    const id = Number(decodeURI(categoryId as string));

    const categoryWithServicesById = await prisma.category.findUnique({
      where: {
        id,
      },
      include: {
        services: {
          select: {
            name: true,
          },
        },
      },
    });

    const oldServices = categoryWithServicesById?.services.map((s) => s.name);
    const oldServicesString = oldServices?.join(", ");

    const servicesString = await getAIResponse(
      `suggest services for \n business name: ${businessName} \n category: ${categoryWithServicesById?.name} ${
        oldServicesString && "\n exclude this services: " + oldServicesString
      } \n return only the services separated by ,`
    );

    const services = servicesString?.split(", ");

    res.status(200).json(services);
  } catch (error) {
    console.error("Error in openai get services by category: ", error);
    return next(error);
  }
}

export async function suggestProfileBio(req: Request, res: Response, next: NextFunction) {
  const { name, cityId, categoryId, services } = req.body;

  let servicesString;
  if (Array.isArray(services)) {
    servicesString = services.join(", ");
  }

  const city = await prisma.city.findUnique({
    where: {
      id: Number(cityId),
    },
    select: {
      name: true,
    },
  });

  const category = await prisma.category.findUnique({
    where: {
      id: Number(categoryId),
    },
    select: {
      name: true,
    },
  });

  if (!servicesString) return next(createHttpError(400, "provide services array"));
  if (!city || !category) return next(createHttpError(400, "fail to fetch city and category"));

  const bio = await getAIResponse(
    `I want a 160 character description in simple language for SEO the web page for \n business name: ${name} \n city: ${city?.name} \n category: ${category?.name} \n services: ${services}`
  );

  res.status(200).json({ bio });
}

// ---------------------------------------------------------------------------------------------------------------

// social medial -----------------------------------------------------------------------------------------------------

export async function getAllSocialMedia(req: Request, res: Response, next: NextFunction) {
  try {
    const socialMedial = await prisma.socialMedia.findMany();
    res.status(200).json(socialMedial);
  } catch (error) {
    console.log(`Error in get all social media: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in get all social media."));
  }
}

// ---------------------------------------------------------------------------------------------------------------

export async function getAvailableCities(req: Request, res: Response, next: NextFunction) {
  try {
    const availableCities = await prisma.city.findMany({
      where: {
        storeAddresses: {
          some: {}, // Ensures there is at least one store in the city
        },
      },
      select: {
        id: true,
        name: true,
      },
    });
    res.status(200).json(availableCities);
  } catch (error) {
    console.log(`Error in get all social media: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in get all social media."));
  }
}
