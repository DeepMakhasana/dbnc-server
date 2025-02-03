import express from "express";
import {
  createCategory,
  createService,
  createStateCity,
  getAllCategory,
  getAllServiceByCategory,
  searchCategory,
  searchService,
} from "./controller";
import { validate } from "../../middlewares/validator.middleware";
import { categorySchema, serviceSchema, stateCitySchema } from "./schema";
import { authenticationMiddleware } from "../../middlewares/auth.middleware";
import { USER_TYPE } from "../../utils/constant";

const utilsRouter = express.Router();

// state and city
utilsRouter.post(
  "/state-city",
  authenticationMiddleware([USER_TYPE.owner]),
  validate(stateCitySchema),
  createStateCity
);
// business category
utilsRouter.post("/category", authenticationMiddleware([USER_TYPE.owner]), validate(categorySchema), createCategory);
utilsRouter.get("/category", authenticationMiddleware([USER_TYPE.owner]), getAllCategory);
utilsRouter.get("/category/search", authenticationMiddleware([USER_TYPE.owner]), searchCategory);
// services of category
utilsRouter.post("/service", authenticationMiddleware([USER_TYPE.owner]), validate(serviceSchema), createService);
utilsRouter.get("/service/:categoryId", authenticationMiddleware([USER_TYPE.owner]), getAllServiceByCategory);
utilsRouter.get("/service/search", authenticationMiddleware([USER_TYPE.owner]), searchService);

export default utilsRouter;
