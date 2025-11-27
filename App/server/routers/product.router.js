import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

import {
    createProduct,
    getAllProducts,
    getProduct,
    getProductForEdit,
    updateProduct,
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

router.get("/get-all-for-table", isAuthenticated, getAllProducts);

router.get("/get-product-for-view/:id", isAuthenticated, getProduct);
router.get("/get-product-for-edit/:id", isAuthenticated, getProductForEdit);
router.put(
    "/update-product/:id",
    isAuthenticated,
    uploadProductImage.single("productImage"),
    updateProduct
);

export default router;
