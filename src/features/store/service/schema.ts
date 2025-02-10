import Joi from "joi";

// ✅ Joi Validation Schema for StoreService
export const storeServiceSchema = Joi.array().items(
  Joi.object({
    storeId: Joi.number().integer().required().messages({
      "any.required": "Store ID is required.",
      "number.base": "Store ID must be a valid number.",
    }),
    serviceId: Joi.number().integer().required().messages({
      "any.required": "Service ID is required.",
      "number.base": "Service ID must be a valid number.",
    }),
    index: Joi.number().integer().required().messages({
      "any.required": "Index is required.",
      "number.base": "Index must be a valid number.",
    }),
  })
);

export const storeIdSchema = Joi.object({
  storeId: Joi.number().integer().required().messages({
    "any.required": "Store ID is required.",
    "number.base": "Store ID must be a valid number.",
  }),
});

export const storeServiceIdSchema = Joi.object({
  storeServiceId: Joi.number().integer().required().messages({
    "any.required": "Store service ID is required.",
    "number.base": "Store service ID must be a valid number.",
  }),
});
