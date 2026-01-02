import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

import {
    createProduct,
    getAllProducts,
    getProduct,
    updateProduct,
} from "../controllers/product.controller.js";
import { uploadProductImage } from "../middlewares/multer.middleware.js";
import { deleteOne } from "../utils/deleteOne.js";
import { getLocalProductModel } from "../config/localDb.js";

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

router.get("/get-all", isAuthenticated, getAllProducts);

router.get("/get/:id", isAuthenticated, getProduct);
router.put(
    "/update/:id",
    isAuthenticated,
    uploadProductImage.single("productImage"),
    updateProduct
);

router.delete("/delete/:id", isAuthenticated, deleteOne(getLocalProductModel));

export default router;
