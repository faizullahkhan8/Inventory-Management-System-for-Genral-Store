import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

import { createProduct } from "../controllers/product.controller.js";

const router = Router();

router.get("/test", (req, res, next) => {
    return res.status(200).json({
        success: true,
        message: "Product route is working",
    });
});

router.post("/create", isAuthenticated, createProduct);

export default router;
