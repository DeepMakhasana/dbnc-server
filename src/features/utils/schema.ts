import Joi from "joi";

export const stateCitySchema = Joi.object({
  state: Joi.string().required().messages({
    "string.base": "State must be a string.",
    "any.required": "State is required.",
  }),

  city: Joi.array()
    .items(
      Joi.string().messages({
        "string.base": "Each city must be a string.",
      })
    )
    .min(1)
    .required()
    .messages({
      "array.base": "City must be an array.",
      "array.min": "At least one city is required.",
      "any.required": "City field is required.",
    }),
});

export const stateIdSchema = Joi.object({
  stateId: Joi.number().integer().required().messages({
    "any.required": "State ID is required.",
    "number.base": "State ID must be a valid number.",
  }),
});

// ✅ Joi Validation Schema for Category
export const categorySchema = Joi.object({
  name: Joi.string().max(50).required().messages({
    "string.max": "Category name must not exceed 50 characters.",
    "any.required": "Category name is required.",
  }),
});

// ✅ Joi Validation Schema for Service
export const serviceSchema = Joi.object({
  name: Joi.string().max(50).required().messages({
    "string.max": "Service name must not exceed 50 characters.",
    "any.required": "Service name is required.",
  }),
  categoryId: Joi.number().integer().required().messages({
    "any.required": "Category ID is required.",
    "number.base": "Category ID must be a valid number.",
  }),
});

// suggest profile schema
export const profileBioSchema = Joi.object({
  name: Joi.string().max(50).required().messages({
    "any.required": "Name is required.",
    "string.base": "Name must be a string.",
    "string.empty": "Name cannot be empty.",
    "string.max": "Name must be at most 50 characters long.",
  }),

  cityId: Joi.number().integer().required().messages({
    "any.required": "City ID is required.",
    "number.base": "City ID must be a valid number.",
  }),

  categoryId: Joi.number().integer().required().messages({
    "any.required": "Category ID is required.",
    "number.base": "Category ID must be a valid number.",
  }),

  services: Joi.array()
    .items(
      Joi.string().required().messages({
        "string.base": "Each service must be a string.",
        "string.empty": "Service cannot be empty.",
      })
    )
    .min(1)
    .required()
    .messages({
      "any.required": "At least one service is required.",
      "array.min": "At least one service must be provided.",
    }),
});
