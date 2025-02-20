import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import prisma from "../../config/prisma";
import { hashSecret, verifySecret } from "../../utils/bcrypt";
import { RequestWithUser } from "../../middlewares/auth.middleware";

export async function createStore(req: Request, res: Response, next: NextFunction) {
  try {
    const value = req.body;

    const store = await prisma.store.create({ data: value });
    res.status(201).json(store);
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
      omit: {
        secret: true,
      },
    });

    res.status(200).json(store);
  } catch (error) {
    console.log(`Error in Store Get by slug: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in Store Get by slug."));
  }
}

export async function getStoreById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id, type } = req.query;
    const storeId = String(id);
    if (!storeId) return next(createHttpError(400, "provide store id."));

    let store;

    if (type === "main-information") {
      store = await prisma.store.findUnique({
        where: { id: parseInt(storeId) },
        select: {
          id: true,
          name: true,
          tagline: true,
          logo: true,
          number: true,
          whatsappNumber: true,
          email: true,
          slug: true,
        },
      });
    } else if (type === "feedback-upi") {
      store = await prisma.store.findUnique({
        where: { id: parseInt(storeId) },
        select: {
          feedbackLink: true,
          upiId: true,
        },
      });
    } else if (type === "category-bio") {
      store = await prisma.store.findUnique({
        where: { id: parseInt(storeId) },
        select: {
          name: true,
          category: true,
          bio: true,
        },
      });
    } else {
      store = await prisma.store.findUnique({
        where: { id: parseInt(storeId) },
        omit: {
          secret: true,
        },
      });
    }
    if (!store) return next(createHttpError(400, "store data not found!"));

    res.status(200).json(store);
  } catch (error) {
    console.log(`Error in Store Get by id: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in Store Get by id."));
  }
}

export async function getStoresByOwnerId(req: RequestWithUser, res: Response, next: NextFunction) {
  try {
    const user = req.user;

    const stores = await prisma.store.findMany({
      where: { storeOwnerUserId: user?.id },
      select: {
        id: true,
        name: true,
        logo: true,
        tagline: true,
        slug: true,
        createdAt: true,
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    res.status(200).json(stores);
  } catch (error) {
    console.log(`Error in Store Get by owner id: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in Store Get by owner id."));
  }
}

export async function updateStoreById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const value = req.body;

    const store = await prisma.store.update({
      where: { id: Number(id) },
      data: value,
      omit: {
        secret: true,
        isActive: true,
        isOpen: true,
        storeOwnerUserId: true,
      },
    });

    console.log("update store", store);

    res.status(200).json(store);
  } catch (error) {
    console.log(`Error in Store update by id: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in Store update by id."));
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

export async function getStoreByCity(req: Request, res: Response, next: NextFunction) {
  try {
    const { city } = req.params;

    const storeByCity = await prisma.store.findMany({
      where: {
        storeAddresses: {
          city: {
            name: { contains: city, mode: "insensitive" },
          },
        },
      },
      select: {
        id: true,
        name: true,
        slug: true,
        logo: true,
        number: true,
        tagline: true,
        category: {
          select: { name: true }, // Get category name
        },
        storeAddresses: {
          select: {
            addressLine: true,
            city: { select: { name: true } },
            state: { select: { name: true } },
          },
        },
      },
    });

    res.status(200).json(storeByCity);
  } catch (error) {
    console.log(`Error in Store Get by city: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in Store Get by city."));
  }
}

export async function getStoreByCitySlug(req: Request, res: Response, next: NextFunction) {
  try {
    const { slug, city } = req.params;
    console.log(slug, city);

    const storeBySlugCity = await prisma.store.findUnique({
      where: {
        slug: slug, // Match the store slug
        // storeAddresses: {
        //   city: {
        //     name: { equals: city, mode: "insensitive" }, // Ensure city matches (case insensitive)
        //   },
        // },
      },
      include: {
        category: { select: { name: true } }, // Get category name
        storeAddresses: {
          select: {
            addressLine: true,
            googleMapLink: true,
            city: { select: { name: true } },
            state: { select: { name: true } },
          },
        },
        storeServices: {
          include: {
            service: { select: { name: true } }, // Include service names
          },
        },
        storeSocialMedias: {
          include: {
            socialMedia: { select: { name: true, icon: true } },
          },
        },
        storePhotos: {
          select: { path: true, index: true }, // Get store images
        },
      },
      omit: {
        secret: true,
      },
    });

    console.log(storeBySlugCity);

    res.status(200).json(storeBySlugCity);
  } catch (error) {
    console.log(`Error in Store Get by slug & city: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in Store Get by slug & city."));
  }
}

export async function getOnlySlugAndCity(req: Request, res: Response, next: NextFunction) {
  try {
    const storesWithCity = await prisma.storeAddress.findMany({
      select: {
        store: { select: { slug: true } },
        city: { select: { name: true } },
      },
    });

    res.status(200).json(storesWithCity);
  } catch (error) {
    console.log(`Error in only store slug & city: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in only store slug & city."));
  }
}

export async function createUpdateStoreSecret(req: Request, res: Response, next: NextFunction) {
  try {
    const { storeId, secret } = req.body;

    const hashedSecret = await hashSecret(secret);

    await prisma.store.update({
      where: {
        id: storeId,
      },
      data: { secret: hashedSecret },
    });

    res.status(201).json({ message: "Secret set/change successfully" });
  } catch (error) {
    console.log("Error in set/change store secret: ", error);
    return next(error);
  }
}

export async function updateStoreOpenCloseStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const { storeId, secret } = req.body;

    const store = await prisma.store.findUnique({
      where: { id: storeId },
      select: { isOpen: true, secret: true }, // Get current status
    });

    if (!store) {
      return next(createHttpError(400, "Wrong store id."));
    }
    if (!store.secret) {
      return next(createHttpError(400, "secret not available, first set secret from store manage dashboard"));
    }

    const isMatch = await verifySecret(secret, store.secret);

    if (isMatch) {
      const updateStoreStatus = await prisma.store.update({
        where: { id: storeId },
        data: { isOpen: !store.isOpen },
        select: {
          id: true,
          slug: true,
          name: true,
          isOpen: true,
        },
      });
      res.status(200).json(updateStoreStatus);
    } else {
      res.status(401).json({ message: "Invalid Secret" });
    }
  } catch (error) {
    console.log("Error in update store status: ", error);
    return next(error);
  }
}
