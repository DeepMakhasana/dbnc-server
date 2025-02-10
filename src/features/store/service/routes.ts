import express from "express";
import { createService, deleteStoreService, getAllServiceByStore, reorderStoreServices } from "./controller";
import { validate } from "../../../middlewares/validator.middleware";
import { authenticationMiddleware } from "../../../middlewares/auth.middleware";
import { USER_TYPE } from "../../../utils/constant";
import { storeIdSchema, storeServiceIdSchema, storeServiceSchema } from "./schema";

const storeServiceRouter = express.Router();

// store service
storeServiceRouter.post("/", authenticationMiddleware([USER_TYPE.owner]), validate(storeServiceSchema), createService);
storeServiceRouter.get(
  "/:storeId",
  authenticationMiddleware([USER_TYPE.owner, USER_TYPE.visitor]),
  validate(storeIdSchema, "params"),
  getAllServiceByStore
);
storeServiceRouter.put("/reorder", authenticationMiddleware([USER_TYPE.owner]), reorderStoreServices);
storeServiceRouter.delete(
  "/:storeServiceId",
  authenticationMiddleware([USER_TYPE.owner]),
  validate(storeServiceIdSchema, "params"),
  deleteStoreService
);

export default storeServiceRouter;
