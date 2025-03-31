import express from "express";
import { createTransaction, createUpiId } from "./controller";
import { validate } from "../../middlewares/validator.middleware";
import { transactionSchema, upiIdSchema } from "./schema";
import { authenticationMiddleware } from "../../middlewares/auth.middleware";

const payRouter = express.Router();

// email otp verification
payRouter.post("/upi-id", authenticationMiddleware(), validate(upiIdSchema), createUpiId);
payRouter.post("/transaction", authenticationMiddleware(), validate(transactionSchema), createTransaction);
// payRouter.post("/verify-email-otp", validate(verifyEmailOtpSchema), verifyEmailOTP);

export default payRouter;
