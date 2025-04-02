import express, { Application, NextFunction } from "express";
import "dotenv/config";

import userRoutes from "./routes/user.routes"
import walletRoutes from "./routes/wallet.routes"

import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json())

app.use("/api/user", userRoutes);
app.use("/api/wallet", walletRoutes);

app.use(errorHandler);

export { app };