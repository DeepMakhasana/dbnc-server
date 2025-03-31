import express from "express";
import { createTransaction, createUpiId, getTransactionByUpiId, getUpiIds } from "./controller";
import { validate } from "../../middlewares/validator.middleware";
import { transactionSchema, upiIdNumberSchema, upiIdSchema } from "./schema";
import { authenticationMiddleware } from "../../middlewares/auth.middleware";

const payRouter = express.Router();

// email otp verification
payRouter.post("/upi-id", authenticationMiddleware(), validate(upiIdSchema), createUpiId);
payRouter.get("/upi-id", authenticationMiddleware(), getUpiIds);
payRouter.post("/transaction", authenticationMiddleware(), validate(transactionSchema), createTransaction);
payRouter.get("/transaction", authenticationMiddleware(), validate(upiIdNumberSchema, "query"), getTransactionByUpiId);
// payRouter.post("/verify-email-otp", validate(verifyEmailOtpSchema), verifyEmailOTP);

export default payRouter;
