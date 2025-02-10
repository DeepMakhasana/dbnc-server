import express from "express";
import { createManyLink, deleteStoreLink, getAllLinkByStore, reorderStoreLink, updateLink } from "./controller";
import { validate } from "../../../middlewares/validator.middleware";
import { authenticationMiddleware } from "../../../middlewares/auth.middleware";
import { USER_TYPE } from "../../../utils/constant";
import {
  storeIdSchema,
  storeSocialMediaIdSchema,
  storeSocialMediaSchema,
  storeSocialMediaUpdateSchema,
} from "./schema";

const storeLinkRouter = express.Router();

// social media link
storeLinkRouter.post(
  "/",
  authenticationMiddleware([USER_TYPE.owner]),
  validate(storeSocialMediaSchema),
  createManyLink
);
storeLinkRouter.get(
  "/:storeId",
  authenticationMiddleware([USER_TYPE.owner, USER_TYPE.visitor]),
  validate(storeIdSchema, "params"),
  getAllLinkByStore
);
storeLinkRouter.put(
  "/:storeSocialMediaId",
  authenticationMiddleware([USER_TYPE.owner]),
  validate(storeSocialMediaIdSchema, "params"),
  validate(storeSocialMediaUpdateSchema),
  updateLink
);
storeLinkRouter.put("/reorder", authenticationMiddleware([USER_TYPE.owner]), reorderStoreLink);
storeLinkRouter.delete(
  "/:storeSocialMediaId",
  authenticationMiddleware([USER_TYPE.owner]),
  validate(storeSocialMediaIdSchema, "params"),
  deleteStoreLink
);

export default storeLinkRouter;
