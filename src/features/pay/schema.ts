import Joi from "joi";

export const transactionSchema = Joi.object({
  upiId: Joi.number().integer().required().messages({
    "number.base": "UPI ID must be a number.",
    "any.required": "UPI ID is required.",
  }),
  amount: Joi.number().integer().positive().min(1).max(1000000).required().messages({
    "number.base": "Amount must be a number.",
    "number.integer": "Amount must be a whole number.",
    "number.positive": "Amount must be greater than zero.",
    "number.min": "Amount must be at least 1.",
    "number.max": "Amount cannot exceed 1,000,000.",
    "any.required": "Amount is required.",
  }),
});

export const upiIdSchema = Joi.object({
  upiId: Joi.string().max(255).allow(null, "").messages({
    "string.max": "UPI ID must not exceed 255 characters.",
  }),
});
