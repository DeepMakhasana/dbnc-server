import express from "express";
import helmet from "helmet";
import cors from "cors";

import globalErrorHandel from "./error";
import config from "./config";

import authRouter from "./features/auth/routes";
import utilsRouter from "./features/utils/routes";
import storeRouter from "./features/store/routes";
import s3Router from "./services/s3";
import storeAddressRouter from "./features/store/address/routes";
import storeLinkRouter from "./features/store/link/routes";
import storePhotoRouter from "./features/store/photo/routes";
import storeServiceRouter from "./features/store/service/routes";
import storeSaveRouter from "./features/store/save/routes";

const app = express();

// Middleware
const allowedOrigins: string[] = [
  config.frontendBaseUrl as string,
  config.storeFrontendBaseUrl as string,
  "https://www.liveyst.com",
  "http://localhost:5173",
  "http://localhost:3000",
];
const corsOptions = {
  origin: (origin: string | undefined, cb: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || allowedOrigins.includes(origin)) {
      cb(null, true);
    } else {
      cb(new Error("Access Denied"));
    }
  }, // Only allow requests from this origin
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
};
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api", (req, res, next) => {
  res.json({ message: "Welcome to one profile live API.", headers: req.headers });
});

app.get("/api/health", (req, res, next) => {
  res.json({ message: "Good health of one profile live API.", status: "Ok" });
});

// use root routes
app.use("/api/auth", authRouter);
app.use("/api/utils", utilsRouter);
app.use("/api/store/address", storeAddressRouter);
app.use("/api/store/link", storeLinkRouter);
app.use("/api/store/photo", storePhotoRouter);
app.use("/api/store/service", storeServiceRouter);
app.use("/api/store/save", storeSaveRouter);
app.use("/api/store", storeRouter);
app.use("/api/s3", s3Router);

// Global error handler
app.use(globalErrorHandel);

export default app;
