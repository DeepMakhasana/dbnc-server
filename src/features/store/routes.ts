import express from "express";
import { createStore, deleteStoreById, getStoreBySlug, updateStoreById } from "./controller";
import { validate } from "../../middlewares/validator.middleware";
import { idSchema, slugSchema, storeSchema } from "./schema";
import { authenticationMiddleware } from "../../middlewares/auth.middleware";
import { USER_TYPE } from "../../utils/constant";

const storeRouter = express.Router();

// store CRUD
storeRouter.post("/", authenticationMiddleware([USER_TYPE.owner]), validate(storeSchema), createStore);
storeRouter.get("/:slug", authenticationMiddleware([USER_TYPE.owner]), validate(slugSchema, "params"), getStoreBySlug);
storeRouter.put(
  "/:id",
  authenticationMiddleware([USER_TYPE.owner]),
  validate(idSchema, "params"),
  validate(storeSchema),
  updateStoreById
);
storeRouter.delete("/:id", authenticationMiddleware([USER_TYPE.owner]), validate(idSchema, "params"), deleteStoreById);

export default storeRouter;
