import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import prisma from "../../config/prisma";
import { RequestWithUser } from "../../middlewares/auth.middleware";

export async function createUpiId(req: RequestWithUser, res: Response, next: NextFunction) {
  try {
    const { upiId } = req.body;
    const user = req.user;

    const createUpiId = await prisma.upiId.create({
      data: {
        upiId,
        userId: Number(user?.id),
      },
    });

    if (!createUpiId) return next(createHttpError(400, "Try again not created!"));

    res.status(200).json({ upiId: createUpiId });
  } catch (error) {
    console.log(`Error in create upiId: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in create upiId."));
  }
}

export async function createTransaction(req: Request, res: Response, next: NextFunction) {
  try {
    const { upiId, amount } = req.body;

    const createTransaction = await prisma.transaction.create({
      data: {
        upiId,
        amount,
      },
    });

    if (!createTransaction) return next(createHttpError(400, "Try again not created!"));

    res.status(200).json({ transaction: createTransaction });
  } catch (error) {
    console.log(`Error in create transaction: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in create transaction."));
  }
}
