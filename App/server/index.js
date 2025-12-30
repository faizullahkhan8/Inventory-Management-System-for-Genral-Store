// packages
import express from "express";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";

// configs
import { createLocalConnection } from "./config/localDb.js";

// routers
import authRouter from "./routers/auth.router.js";
import productRouter from "./routers/product.router.js";
import trashRouter from "./routers/trash.router.js";
import supplierRouter from "./routers/supplier.router.js";
import categoryRouter from "./routers/category.router.js";
import billRouter from "./routers/bill.router.js";

import errorHandler from "./middlewares/errorhandler.middleware.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "10mb" }));
app.use(
    cors({
        origin: [
            process.env.LOCAL_CLIENT_URL || "http://localhost:5173",
            process.env.HOST_CLIENT_URL || "http://stockpilot.local:5173",
            "http://localhost:5173",
        ],
        origin: (origin, cb) => cb(null, origin),
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

app.use("/assets", express.static("assets"));
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        name: "session",
        secret: process.env.SESSION_SECRET,
        store: MongoStore.create({
            mongoUrl: process.env.DB_URI,
            collectionName: "sessions",
            ttl: 60 * 60 * 24, // 1 day in seconds
        }),
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // 1 day in milliseconds
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        },
    })
);

// Routers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/trash", trashRouter);
app.use("/api/v1/supplier", supplierRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/bill", billRouter);

try {
    await createLocalConnection();
} catch (err) {
    console.error("Failed to create local DB connection:", err);
}

app.listen(PORT, process.env.IS_HOSTED ? "0.0.0.0" : "localhost", async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.use(errorHandler);
