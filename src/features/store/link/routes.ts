import storeRouter from "../routes";
import { createLink, deleteStoreLink, getAllLinkByStore, reorderStoreLink, updateLink } from "./controller";
import { validate } from "../../../middlewares/validator.middleware";
import { authenticationMiddleware } from "../../../middlewares/auth.middleware";
import { USER_TYPE } from "../../../utils/constant";
import {
  storeIdSchema,
  storeSocialMediaIdSchema,
  storeSocialMediaSchema,
  storeSocialMediaUpdateSchema,
} from "./schema";

// social media link
storeRouter.post("/link", authenticationMiddleware([USER_TYPE.owner]), validate(storeSocialMediaSchema), createLink);
storeRouter.get(
  "/link/:storeId",
  authenticationMiddleware([USER_TYPE.owner, USER_TYPE.visitor]),
  validate(storeIdSchema, "params"),
  getAllLinkByStore
);
storeRouter.put(
  "/link/:storeSocialMediaId",
  authenticationMiddleware([USER_TYPE.owner]),
  validate(storeSocialMediaIdSchema, "params"),
  validate(storeSocialMediaUpdateSchema),
  updateLink
);
storeRouter.put("/link/reorder", authenticationMiddleware([USER_TYPE.owner]), reorderStoreLink);
storeRouter.delete(
  "/link/:storeSocialMediaId",
  authenticationMiddleware([USER_TYPE.owner]),
  validate(storeSocialMediaIdSchema, "params"),
  deleteStoreLink
);
