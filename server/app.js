import express from "express";
import cors from "cors";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import ErrorMiddlware from "./middlewares/ErrorHandler.js";
import authRouter from "./routes/authRoutes.js";
import productRouter from "./routes/productRoute.js";
import categoryRoute from "./routes/categoryRoute.js";

config({
  path: "./config/config.env",
});

const app = express();

// USING MIDDLEWARES
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// ROUTES
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/category", categoryRoute);

export default app;

app.get("/", (req, res) => {
  res.send(`Working Fine`);
});

app.use(ErrorMiddlware);
