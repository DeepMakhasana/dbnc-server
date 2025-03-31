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

export async function getUpiIds(req: RequestWithUser, res: Response, next: NextFunction) {
  try {
    const user = req.user;

    const upiIds = await prisma.upiId.findMany({
      where: {
        userId: Number(user?.id),
      },
    });

    res.status(200).json({ upiId: upiIds });
  } catch (error) {
    console.log(`Error in get upiId: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in get upiId."));
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

export async function getTransactionByUpiId(req: Request, res: Response, next: NextFunction) {
  try {
    const { upiId } = req.query;

    const transactions = await prisma.transaction.findMany({
      where: {
        upiId: Number(upiId),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({ transactions });
  } catch (error) {
    console.log(`Error in get transactions: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in get transactions."));
  }
}
