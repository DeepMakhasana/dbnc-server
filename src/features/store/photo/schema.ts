import Joi from "joi";

// ✅ Joi Schema for Store Photos
export const storePhotoSchema = Joi.object({
  storeId: Joi.number().integer().required().messages({
    "any.required": "Store ID is required.",
    "number.base": "Store ID must be a valid number.",
  }),
  paths: Joi.array().items(Joi.string().required()).min(1).required().messages({
    "any.required": "At least one photo is required.",
    "array.min": "You must provide at least one photo URL.",
    "string.uri": "Each photo must be a valid URL.",
  }),
});

export const storeIdSchema = Joi.object({
  storeId: Joi.number().integer().required().messages({
    "any.required": "Store ID is required.",
    "number.base": "Store ID must be a valid number.",
  }),
});

export const storePhotoIdSchema = Joi.object({
  storePhotoId: Joi.number().integer().required().messages({
    "any.required": "Store photo ID is required.",
    "number.base": "Store photo ID must be a valid number.",
  }),
});
