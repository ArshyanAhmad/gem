import express, { Application, NextFunction } from "express";
import cors from "cors";
import "dotenv/config";

import userRoutes from "./routes/user.routes"
import walletRoutes from "./routes/wallet.routes"

import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true
    })
)

app.use(express.json())

app.use("/api/user", userRoutes);
app.use("/api/wallet", walletRoutes);

app.use(errorHandler);

export { app };