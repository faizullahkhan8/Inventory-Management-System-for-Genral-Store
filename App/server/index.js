// packages
import express from "express";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";

// configs
import connectDB from "./config/db.js";

// routers
import authRouter from "./routers/auth.router.js";
import errorHandler from "./middlewares/errorhandler.middleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

app.use(
    session({
        name: "session-id",
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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

connectDB();

app.use(errorHandler);
