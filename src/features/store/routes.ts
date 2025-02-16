import express from "express";
import {
  createStore,
  createUpdateStoreSecret,
  deleteStoreById,
  getOnlySlugAndCity,
  getStoreByCity,
  getStoreByCitySlug,
  getStoreById,
  getStoreBySlug,
  getStoresByOwnerId,
  updateStoreById,
  updateStoreOpenCloseStatus,
} from "./controller";
import { validate } from "../../middlewares/validator.middleware";
import {
  citySchema,
  getByIdQuerySchema,
  idSchema,
  slugCitySchema,
  slugSchema,
  storeCategoryBioSchema,
  storeFeedbackUpiSchema,
  storeIdSecretSchema,
  storeMainDetailSchema,
  storeSchema,
} from "./schema";
import { authenticationMiddleware } from "../../middlewares/auth.middleware";
import { USER_TYPE } from "../../utils/constant";

const storeRouter = express.Router();

// store CRUD
storeRouter.post("/", authenticationMiddleware([USER_TYPE.owner]), validate(storeSchema), createStore);
storeRouter.get(
  "/",
  authenticationMiddleware([USER_TYPE.owner, USER_TYPE.visitor]),
  validate(getByIdQuerySchema, "query"),
  getStoreById
);
storeRouter.get("/owner", authenticationMiddleware([USER_TYPE.owner]), getStoresByOwnerId);
storeRouter.post(
  "/secret",
  authenticationMiddleware([USER_TYPE.owner]),
  validate(storeIdSecretSchema),
  createUpdateStoreSecret
);
storeRouter.put("/status", validate(storeIdSecretSchema), updateStoreOpenCloseStatus);
storeRouter.get("/slug-city", getOnlySlugAndCity);
storeRouter.get("/city/:city", validate(citySchema, "params"), getStoreByCity);
storeRouter.get("/:slug/city/:city", validate(slugCitySchema, "params"), getStoreByCitySlug);
storeRouter.get("/:slug", validate(slugSchema, "params"), getStoreBySlug);
storeRouter.put(
  "/main-detail/:id",
  authenticationMiddleware([USER_TYPE.owner]),
  validate(idSchema, "params"),
  validate(storeMainDetailSchema),
  updateStoreById
);
storeRouter.put(
  "/category-bio/:id",
  authenticationMiddleware([USER_TYPE.owner]),
  validate(idSchema, "params"),
  validate(storeCategoryBioSchema),
  updateStoreById
);
storeRouter.put(
  "/feedback-upi/:id",
  authenticationMiddleware([USER_TYPE.owner]),
  validate(idSchema, "params"),
  validate(storeFeedbackUpiSchema),
  updateStoreById
);
storeRouter.delete("/:id", authenticationMiddleware([USER_TYPE.owner]), validate(idSchema, "params"), deleteStoreById);

export default storeRouter;
