import expressAsyncHandler from "express-async-handler";
import { ErrorResponse } from "../utils/ErrorResponse.js";
import { getLocalCategoryModel } from "../config/localDb.js";

export const createCategory = expressAsyncHandler(async (req, res, next) => {
    try {
        const cateogryModel = getLocalCategoryModel();
        const { name, parentId } = req.body;

        if (!name) {
            return next(new ErrorResponse("Category name is required.", 400));
        }

        const dbCategory = await cateogryModel.create({
            name,
            parentId,
        });

        return res.status(201).json({
            success: true,
            message: "Cetegory created successfully.",
            category: dbCategory,
        });
    } catch (error) {
        console.log("Error in create category : ", error.message);
        return next(new ErrorResponse("Internal server error.", 500));
    }
});

export const getAllCategories = expressAsyncHandler(async (req, res, next) => {
    try {
        const categoryModel = getLocalCategoryModel();

        if (!categoryModel) {
            return next(new ErrorResponse("Database not initialized.", 500));
        }

        const { parentId, status, search } = req.query;
        const filter = {};

        if (parentId) filter.parentId = parentId;
        if (status) filter.status = status;
        if (search) filter.name = { $regex: search, $options: "i" };

        const categories = await categoryModel
            .find(filter)
            .sort({ name: 1 }) // sort alphabetically by name
            .lean(); // returns plain JS objects instead of Mongoose docs

        return res.status(200).json({
            success: true,
            count: categories.length,
            categories,
        });
    } catch (error) {
        console.error("Error in get all categories:", error.message);
        return next(new ErrorResponse("Internal server error.", 500));
    }
});

export const updateCategory = expressAsyncHandler(async (req, res, next) => {
    try {
        const categoryModel = getLocalCategoryModel();

        if (!categoryModel) {
            return next(new ErrorResponse("Database not initialized.", 500));
        }

        const { categoryId } = req.params;
        const { name, parentId, status } = req.body;

        if (!categoryId) {
            return next(new ErrorResponse("Category ID is required.", 400));
        }

        const category = await categoryModel.findById(categoryId);

        if (!category) {
            return next(new ErrorResponse("Category not found.", 404));
        }

        // Update only provided fields
        if (name) category.name = name;
        if (parentId !== undefined) category.parentId = parentId;
        if (status !== undefined) category.status = status;

        await category.save();

        return res.status(200).json({
            success: true,
            message: "Category updated successfully.",
            category,
        });
    } catch (error) {
        console.error("Error in update category:", error.message);
        return next(new ErrorResponse("Internal server error.", 500));
    }
});
