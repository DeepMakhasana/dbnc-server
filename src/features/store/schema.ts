import Joi from "joi";

export const storeSchema = Joi.object({
  slug: Joi.string()
    .pattern(/^[a-z0-9]+(?:[-_][a-z0-9]+)*$/)
    .max(100) // Match the max length in your Prisma schema
    .required()
    .messages({
      "string.pattern.base":
        "Slug must contain only lowercase letters, numbers, hyphens, or underscores, and cannot start or end with a hyphen/underscore.",
      "string.max": "Slug cannot exceed 100 characters.",
      "string.empty": "Slug is required.",
    }),
  name: Joi.string().max(50).required().messages({
    "string.max": "Name must not exceed 50 characters.",
    "any.required": "Name is required.",
  }),
  tagline: Joi.string().max(70).required().messages({
    "string.max": "Tagline must not exceed 70 characters.",
    "any.required": "Tagline is required.",
  }),
  logo: Joi.string().max(255).required().messages({
    "string.max": "Logo URL must not exceed 255 characters.",
    "any.required": "Logo is required.",
  }),
  number: Joi.string().length(10).required().messages({
    "string.length": "Number must be exactly 10 digits.",
    "any.required": "Number is required.",
  }),
  whatsappNumber: Joi.string().length(10).required().messages({
    "string.length": "WhatsApp Number must be exactly 10 digits.",
    "any.required": "WhatsApp Number is required.",
  }),
  email: Joi.string().email().max(255).required().messages({
    "string.email": "Invalid email format.",
    "any.required": "Email is required.",
  }),
  categoryId: Joi.number().integer().required().messages({
    "number.base": "Category ID must be a number.",
    "any.required": "Category ID is required.",
  }),
  bio: Joi.string().max(255).required().messages({
    "string.max": "Bio must not exceed 255 characters.",
    "any.required": "Bio is required.",
  }),
  feedbackLink: Joi.string().max(255).allow(null, "").messages({
    "string.max": "Feedback Link must not exceed 255 characters.",
  }),
  upiId: Joi.string().max(255).allow(null, "").messages({
    "string.max": "UPI ID must not exceed 255 characters.",
  }),
  storeOwnerUserId: Joi.number().integer().required().messages({
    "number.base": "Store Owner ID must be a number.",
    "any.required": "Store Owner ID is required.",
  }),
  isActive: Joi.boolean().required().messages({
    "boolean.base": "isActive must be a boolean value.",
    "any.required": "isActive is required.",
  }),
});

export const storeMainDetailSchema = Joi.object({
  name: Joi.string().max(50).required().messages({
    "string.max": "Name must not exceed 50 characters.",
    "any.required": "Name is required.",
  }),
  tagline: Joi.string().max(70).required().messages({
    "string.max": "Tagline must not exceed 70 characters.",
    "any.required": "Tagline is required.",
  }),
  logo: Joi.string().max(255).required().messages({
    "string.max": "Logo URL must not exceed 255 characters.",
    "any.required": "Logo is required.",
  }),
  number: Joi.string().length(10).required().messages({
    "string.length": "Number must be exactly 10 digits.",
    "any.required": "Number is required.",
  }),
  whatsappNumber: Joi.string().length(10).required().messages({
    "string.length": "WhatsApp Number must be exactly 10 digits.",
    "any.required": "WhatsApp Number is required.",
  }),
  email: Joi.string().email().max(255).required().messages({
    "string.email": "Invalid email format.",
    "any.required": "Email is required.",
  }),
});

export const storeCategoryBioSchema = Joi.object({
  categoryId: Joi.number().integer().required().messages({
    "number.base": "Category ID must be a number.",
    "any.required": "Category ID is required.",
  }),
  bio: Joi.string().max(255).required().messages({
    "string.max": "Bio must not exceed 255 characters.",
    "any.required": "Bio is required.",
  }),
});

export const storeFeedbackUpiSchema = Joi.object({
  feedbackLink: Joi.string().max(255).allow(null, "").messages({
    "string.max": "Feedback Link must not exceed 255 characters.",
  }),
  upiId: Joi.string().max(255).allow(null, "").messages({
    "string.max": "UPI ID must not exceed 255 characters.",
  }),
});

export const slugSchema = Joi.object({
  slug: Joi.string()
    .pattern(/^[a-z0-9]+(?:[-_][a-z0-9]+)*$/)
    .max(100) // Match the max length in your Prisma schema
    .required()
    .messages({
      "string.pattern.base":
        "Slug must contain only lowercase letters, numbers, hyphens, or underscores, and cannot start or end with a hyphen/underscore.",
      "string.max": "Slug cannot exceed 100 characters.",
      "string.empty": "Slug is required.",
    }),
});

export const idSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    "number.base": "Store ID must be a number.",
    "any.required": "Store ID is required.",
  }),
});

export const citySchema = Joi.object({
  city: Joi.string()
    .pattern(/^[a-z0-9]+(?:[-_][a-z0-9]+)*$/)
    .max(100) // Match the max length in your Prisma schema
    .required()
    .messages({
      "string.pattern.base":
        "city must contain only lowercase letters, numbers, hyphens, or underscores, and cannot start or end with a hyphen/underscore.",
      "string.max": "city cannot exceed 100 characters.",
      "string.empty": "city is required.",
    }),
});

export const slugCitySchema = Joi.object({
  slug: Joi.string()
    .pattern(/^[a-z0-9]+(?:[-_][a-z0-9]+)*$/)
    .max(100) // Match the max length in your Prisma schema
    .required()
    .messages({
      "string.pattern.base":
        "Slug must contain only lowercase letters, numbers, hyphens, or underscores, and cannot start or end with a hyphen/underscore.",
      "string.max": "Slug cannot exceed 100 characters.",
      "string.empty": "Slug is required.",
    }),
  city: Joi.string()
    .pattern(/^[a-z0-9]+(?:[-_][a-z0-9]+)*$/)
    .max(100) // Match the max length in your Prisma schema
    .required()
    .messages({
      "string.pattern.base":
        "city must contain only lowercase letters, numbers, hyphens, or underscores, and cannot start or end with a hyphen/underscore.",
      "string.max": "city cannot exceed 100 characters.",
      "string.empty": "city is required.",
    }),
});

export const storeIdSecretSchema = Joi.object({
  storeId: Joi.number().integer().required().messages({
    "number.base": "Store ID must be a number.",
    "any.required": "Store ID is required.",
  }),
  secret: Joi.string()
    .pattern(/^\d{4}$/) // Ensures exactly 4 digits (0-9)
    .required()
    .messages({
      "string.pattern.base": "Secret must be a 4-digit number.",
      "any.required": "Secret is required.",
    }),
});

export const getByIdQuerySchema = Joi.object({
  id: Joi.string().pattern(/^\d+$/).required().messages({
    "string.pattern.base": "ID must be a numeric string.",
    "any.required": "ID is required.",
  }),
  type: Joi.string().valid("main-information", "feedback-upi", "category-bio").optional().messages({
    "any.only": 'Action must be "main-information", "feedback-upi", "category-bio".',
  }),
});
