import express from "express";
import { createAddress, deleteStoreAddress, getStoreAddressById, updateStoreAddress } from "./controller";
import { validate } from "../../../middlewares/validator.middleware";
import { authenticationMiddleware } from "../../../middlewares/auth.middleware";
import { USER_TYPE } from "../../../utils/constant";
import { storeAddressIdSchema, storeAddressSchema, storeIdSchema } from "./schema";

const storeAddressRouter = express.Router();

// state and city
storeAddressRouter.post("/", authenticationMiddleware([USER_TYPE.owner]), validate(storeAddressSchema), createAddress);
storeAddressRouter.get(
  "/:storeId",
  authenticationMiddleware([USER_TYPE.owner, USER_TYPE.visitor]),
  validate(storeIdSchema, "params"),
  getStoreAddressById
);
storeAddressRouter.put(
  "/:storeAddressId",
  authenticationMiddleware([USER_TYPE.owner]),
  validate(storeAddressIdSchema, "params"),
  validate(storeAddressSchema),
  updateStoreAddress
);
storeAddressRouter.delete(
  "/:storeAddressId",
  authenticationMiddleware([USER_TYPE.owner]),
  validate(storeAddressIdSchema, "params"),
  deleteStoreAddress
);

export default storeAddressRouter;
