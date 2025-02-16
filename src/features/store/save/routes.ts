import express from "express";
import { checkSavedOrNot, createStoreSave, deleteSavedStore, getAllOwnSavedStore } from "./controller";
import { validate } from "../../../middlewares/validator.middleware";
import { authenticationMiddleware } from "../../../middlewares/auth.middleware";
import { USER_TYPE } from "../../../utils/constant";
import { storeIdSchema } from "./schema";

const storeSaveRouter = express.Router();

// saved store
storeSaveRouter.post("/", authenticationMiddleware([USER_TYPE.visitor]), validate(storeIdSchema), createStoreSave);
storeSaveRouter.get("/", authenticationMiddleware([USER_TYPE.visitor]), getAllOwnSavedStore);
storeSaveRouter.get(
  "/:storeId",
  authenticationMiddleware([USER_TYPE.visitor]),
  validate(storeIdSchema, "params"),
  checkSavedOrNot
);
storeSaveRouter.delete(
  "/:storeId",
  authenticationMiddleware([USER_TYPE.visitor]),
  validate(storeIdSchema, "params"),
  deleteSavedStore
);

export default storeSaveRouter;
