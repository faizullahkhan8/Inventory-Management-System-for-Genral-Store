import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

import {
    createProduct,
    uploadImage,
    getAllProducts,
} from "../controllers/product.controller.js";
import { uploadProductImage } from "../middlewares/multer.middleware.js";

const router = Router();

router.get("/test", (req, res, next) => {
    return res.status(200).json({
        success: true,
        message: "Product route is working",
    });
});

router.post(
    "/create",
    uploadProductImage.single("productImage"),
    isAuthenticated,
    createProduct
);

router.get("/get-all-for-product", isAuthenticated, getAllProducts);

export default router;
