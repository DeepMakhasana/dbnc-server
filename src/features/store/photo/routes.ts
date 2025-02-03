import storeRouter from "../routes";
import { createPhotos, deleteStorePhoto, getAllPhotoByStore, reorderStorePhotos } from "./controller";
import { validate } from "../../../middlewares/validator.middleware";
import { authenticationMiddleware } from "../../../middlewares/auth.middleware";
import { USER_TYPE } from "../../../utils/constant";
import { storeIdSchema, storePhotoSchema, storePhotoIdSchema } from "./schema";

// state and city
storeRouter.post("/photo", authenticationMiddleware([USER_TYPE.owner]), validate(storePhotoSchema), createPhotos);
storeRouter.get(
  "/photo/:storeId",
  authenticationMiddleware([USER_TYPE.owner, USER_TYPE.visitor]),
  validate(storeIdSchema, "params"),
  getAllPhotoByStore
);
storeRouter.put("/photo/reorder", authenticationMiddleware([USER_TYPE.owner]), reorderStorePhotos);
storeRouter.delete(
  "/photo/:storePhotoId",
  authenticationMiddleware([USER_TYPE.owner]),
  validate(storePhotoIdSchema, "params"),
  deleteStorePhoto
);
