import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import {
    createCategory,
    getAllCategories,
    updateCategory,
} from "../controllers/category.controller.js";
import { deleteOne } from "../utils/deleteOne.js";
import { getLocalCategoryModel } from "../config/localDb.js";

const router = new Router();

router.get("/test", (req, res, next) =>
    res
        .status(200)
        .json({ sucesss: true, message: "Category route working..." })
);

router.post("/create", isAuthenticated, createCategory);
router.get("/get-all", isAuthenticated, getAllCategories);
router.put("/update/:id", isAuthenticated, updateCategory);
router.delete(
    "/delete/:id",
    isAuthenticated,
    deleteOne(getLocalCategoryModel())
);

export default router;
