import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

import {
    createProduct,
    uploadImage,
} from "../controllers/product.controller.js";
import { uploadProductImage } from "../middlewares/multer.middleware.js";

const router = Router();

router.get("/test", (req, res, next) => {
    return res.status(200).json({
        success: true,
        message: "Product route is working",
    });
});

router.post("/create", isAuthenticated, createProduct);
router.post(
    "/upload-image",
    isAuthenticated,
    uploadProductImage.single("productImage"),
    uploadImage
);

export default router;
