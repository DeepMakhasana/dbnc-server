import express from "express";
import {
  sendVerificationEmail,
  storeOwnerUserRegisterWithEmail,
  verifyEmailOTP,
  visitorUserLoginWithEmail,
  visitorProfileUpdate,
} from "./controller";
import { validate } from "../../middlewares/validator.middleware";
import { emailSchema, ownerUserSchema, verifyEmailOtpSchema, visitorUserUpdateSchema } from "./schema";
import { authenticationMiddleware } from "../../middlewares/auth.middleware";
import { USER_TYPE } from "../../utils/constant";

const authRouter = express.Router();

// email otp verification
authRouter.post("/send-verification-email", validate(emailSchema), sendVerificationEmail);
authRouter.post("/verify-email-otp", validate(verifyEmailOtpSchema), verifyEmailOTP);

// login
authRouter.post("/visitor/login", validate(emailSchema), visitorUserLoginWithEmail);
authRouter.post("/owner/onboard", validate(ownerUserSchema), storeOwnerUserRegisterWithEmail);

authRouter.put(
  "/visitor",
  authenticationMiddleware([USER_TYPE.visitor]),
  validate(visitorUserUpdateSchema),
  visitorProfileUpdate
);

export default authRouter;
