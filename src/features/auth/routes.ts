import express from "express";
import { sendVerificationEmail, verifyEmailOTP, visitorUserLoginWithEmail } from "./controller";
import { validate } from "../../middlewares/validator.middleware";
import { emailSchema, verifyEmailOtpSchema } from "./schema";

const authRouter = express.Router();

// email otp verification
authRouter.post("/send-verification-email", validate(emailSchema), sendVerificationEmail);
authRouter.post("/verify-email-otp", validate(verifyEmailOtpSchema), verifyEmailOTP);

// login
authRouter.post("/visitor/login", validate(emailSchema), visitorUserLoginWithEmail);

export default authRouter;
