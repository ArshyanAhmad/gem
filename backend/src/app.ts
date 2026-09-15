import express from "express";
import dns from "dns"
import cors from "cors";
import "dotenv/config";

dns.setServers([
    "1.1.1.1",
    "8.8.8.8"
])

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