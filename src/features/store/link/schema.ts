import Joi from "joi";

// ✅ Joi Validation Schema for Store Social Media
export const storeSocialMediaSchema = Joi.array().items(
  Joi.object({
    storeId: Joi.number().integer().required().messages({
      "any.required": "Store ID is required.",
      "number.base": "Store ID must be a valid number.",
    }),
    SocialMediaId: Joi.number().integer().required().messages({
      "any.required": "Social Media ID is required.",
      "number.base": "Social Media ID must be a valid number.",
    }),
    link: Joi.string().uri().max(255).required().messages({
      "any.required": "Social Media Link is required.",
      "string.uri": "Link must be a valid URL.",
      "string.max": "Link must be at most 255 characters long.",
    }),
    index: Joi.number().integer().required().messages({
      "any.required": "Index is required.",
      "number.base": "Index must be a valid number.",
    }),
  })
);

export const storeSocialMediaUpdateSchema = Joi.object({
  link: Joi.string().uri().max(255).required().messages({
    "any.required": "Social Media Link is required.",
    "string.uri": "Link must be a valid URL.",
    "string.max": "Link must be at most 255 characters long.",
  }),
});

export const storeIdSchema = Joi.object({
  storeId: Joi.number().integer().required().messages({
    "any.required": "Store ID is required.",
    "number.base": "Store ID must be a valid number.",
  }),
});

export const storeSocialMediaIdSchema = Joi.object({
  storeSocialMediaId: Joi.number().integer().required().messages({
    "any.required": "Store social media ID is required.",
    "number.base": "Store social media ID must be a valid number.",
  }),
});
