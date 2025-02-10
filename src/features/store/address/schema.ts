import Joi from "joi";

// ✅ Joi Validation Schema for Store Address
export const storeAddressSchema = Joi.object({
  storeId: Joi.number().integer().required().messages({
    "any.required": "Store ID is required.",
    "number.base": "Store ID must be a valid number.",
  }),
  addressLine: Joi.string().max(255).required().messages({
    "any.required": "Address Line is required.",
    "string.max": "Address Line must be at most 255 characters long.",
  }),
  stateId: Joi.number().integer().required().messages({
    "any.required": "State ID is required.",
    "number.base": "State ID must be a valid number.",
  }),
  cityId: Joi.number().integer().required().messages({
    "any.required": "City ID is required.",
    "number.base": "City ID must be a valid number.",
  }),
  latitude: Joi.number().required().messages({
    "any.required": "Latitude is required.",
    "number.base": "Latitude must be a valid number.",
  }),
  longitude: Joi.number().required().messages({
    "any.required": "Longitude is required.",
    "number.base": "Longitude must be a valid number.",
  }),
  googleMapLink: Joi.string().uri().max(255).required().messages({
    "any.required": "Google Map Link is required.",
    "string.uri": "Google Map Link must be a valid URL.",
    "string.max": "Google Map Link must be at most 255 characters long.",
  }),
  pincode: Joi.number().integer().min(100000).max(999999).required().messages({
    "number.base": "Pincode must be a valid number.",
    "number.integer": "Pincode must be an integer.",
    "number.min": "Pincode must be exactly 6 digits.",
    "number.max": "Pincode must be exactly 6 digits.",
    "any.required": "Pincode is required.",
  }),
});

export const storeIdSchema = Joi.object({
  storeId: Joi.number().integer().required().messages({
    "any.required": "Store ID is required.",
    "number.base": "Store ID must be a valid number.",
  }),
});

export const storeAddressIdSchema = Joi.object({
  storeAddressId: Joi.number().integer().required().messages({
    "any.required": "Store address ID is required.",
    "number.base": "Store address ID must be a valid number.",
  }),
});
