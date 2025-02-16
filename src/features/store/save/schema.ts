import Joi from "joi";

export const storeIdSchema = Joi.object({
  storeId: Joi.number().integer().required().messages({
    "any.required": "Store ID is required.",
    "number.base": "Store ID must be a valid number.",
  }),
});
