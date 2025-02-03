import storeRouter from "../routes";
import { createAddress, deleteStoreAddress, getStoreAddressById, updateStoreAddress } from "./controller";
import { validate } from "../../../middlewares/validator.middleware";
import { authenticationMiddleware } from "../../../middlewares/auth.middleware";
import { USER_TYPE } from "../../../utils/constant";
import { storeAddressIdSchema, storeAddressSchema, storeIdSchema } from "./schema";

// state and city
storeRouter.post("/address", authenticationMiddleware([USER_TYPE.owner]), validate(storeAddressSchema), createAddress);
storeRouter.get(
  "/address/:storeId",
  authenticationMiddleware([USER_TYPE.owner, USER_TYPE.visitor]),
  validate(storeIdSchema, "params"),
  getStoreAddressById
);
storeRouter.put(
  "/address/:storeAddressId",
  authenticationMiddleware([USER_TYPE.owner]),
  validate(storeAddressIdSchema, "params"),
  validate(storeAddressSchema),
  updateStoreAddress
);
storeRouter.delete(
  "/address/:storeAddressId",
  authenticationMiddleware([USER_TYPE.owner]),
  validate(storeAddressIdSchema, "params"),
  deleteStoreAddress
);
