import storeRouter from "../routes";
import { createService, deleteStoreService, getAllServiceByStore, reorderStoreServices } from "./controller";
import { validate } from "../../../middlewares/validator.middleware";
import { authenticationMiddleware } from "../../../middlewares/auth.middleware";
import { USER_TYPE } from "../../../utils/constant";
import { storeIdSchema, storeServiceIdSchema, storeServiceSchema } from "./schema";

// state and city
storeRouter.post("/service", authenticationMiddleware([USER_TYPE.owner]), validate(storeServiceSchema), createService);
storeRouter.get(
  "/service/:storeId",
  authenticationMiddleware([USER_TYPE.owner, USER_TYPE.visitor]),
  validate(storeIdSchema, "params"),
  getAllServiceByStore
);
storeRouter.put("/service/reorder", authenticationMiddleware([USER_TYPE.owner]), reorderStoreServices);
storeRouter.delete(
  "/service/:storeServiceId",
  authenticationMiddleware([USER_TYPE.owner]),
  validate(storeServiceIdSchema, "params"),
  deleteStoreService
);
