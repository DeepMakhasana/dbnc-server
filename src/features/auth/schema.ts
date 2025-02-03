import Joi from "joi";

export const emailSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": '"email" must be a valid email address',
    "any.required": '"email" is required',
  }),
});

export const verifyEmailOtpSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": '"email" must be a valid email address',
    "any.required": '"email" is required',
  }),
  otp: Joi.string()
    .pattern(/^[0-9]{6}$/)
    .required()
    .messages({
      "string.pattern.base": '"OTP" must be exactly 6 digits',
      "any.required": '"OTP" is required',
    }),
  userType: Joi.string().required().max(20),
});
