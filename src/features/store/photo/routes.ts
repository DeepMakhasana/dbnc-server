import express from "express";
import { createPhotos, deleteStorePhoto, getAllPhotoByStore, reorderStorePhotos } from "./controller";
import { validate } from "../../../middlewares/validator.middleware";
import { authenticationMiddleware } from "../../../middlewares/auth.middleware";
import { USER_TYPE } from "../../../utils/constant";
import { storeIdSchema, storePhotoSchema, storePhotoIdSchema } from "./schema";

const storePhotoRouter = express.Router();

// state and city
storePhotoRouter.post("/", authenticationMiddleware([USER_TYPE.owner]), validate(storePhotoSchema), createPhotos);
storePhotoRouter.get(
  "/:storeId",
  authenticationMiddleware([USER_TYPE.owner, USER_TYPE.visitor]),
  validate(storeIdSchema, "params"),
  getAllPhotoByStore
);
storePhotoRouter.put("/reorder", authenticationMiddleware([USER_TYPE.owner]), reorderStorePhotos);
storePhotoRouter.delete(
  "/:storePhotoId",
  authenticationMiddleware([USER_TYPE.owner]),
  validate(storePhotoIdSchema, "params"),
  deleteStorePhoto
);

export default storePhotoRouter;
