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

export const ownerUserSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    "any.required": "Name is required.",
    "string.base": "Name must be a string.",
    "string.empty": "Name cannot be empty.",
    "string.min": "Name must be at least 2 characters long.",
    "string.max": "Name must be at most 50 characters long.",
  }),

  email: Joi.string().email().required().messages({
    "any.required": "Email is required.",
    "string.email": "Email must be a valid email address.",
    "string.empty": "Email cannot be empty.",
  }),

  number: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "any.required": "Number is required.",
      "string.base": "Number must be a string.",
      "string.pattern.base": "Number must be a 10-digit numeric string.",
      "string.empty": "Number cannot be empty.",
    }),
});

export const visitorUserUpdateSchema = Joi.object({
  name: Joi.string().max(70).required().messages({
    "any.required": "Name is required.",
    "string.base": "Name must be a string.",
    "string.empty": "Name cannot be empty.",
    "string.max": "Name must be at most 70 characters long.",
  }),

  number: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "any.required": "Number is required.",
      "string.base": "Number must be a string.",
      "string.pattern.base": "Number must be a valid 10-digit numeric string.",
      "string.empty": "Number cannot be empty.",
    }),
});
