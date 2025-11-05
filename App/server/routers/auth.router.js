import { Router } from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
} from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/test", (req, res) => {
    res.send("Auth route is working!");
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", isAuthenticated, logoutUser);

export default router;
