import AsyncHandler from "express-async-handler";
import { ErrorResponse } from "../utils/ErrorResponse.js";

import Product from "../models/product.model.js";

export const createProduct = AsyncHandler(async (req, res, next) => {
    try {
        const data = req.body;

        if (!data) {
            return next(new ErrorResponse("In-complete product data.", 400));
        }

        const { name, description, sellingPrice, purchasePrice, sku } = data;

        if (!name || !description || !sellingPrice || !purchasePrice || !sku) {
            return next(
                new ErrorResponse("Please provide required fields.", 400)
            );
        }

        const isExist = await Product.findOne({ name, sku });

        if (isExist) {
            return next(
                new ErrorResponse(
                    "Product with sku and name is already exists",
                    400
                )
            );
        }

        const newProduct = await Product.create(data);

        return res.status(201).json({
            success: true,
            message: "Product created successfully.",
            product: newProduct,
        });
    } catch (error) {
        console.log("Error in create product controller.", error.message);
        return next(new ErrorResponse("Internal server error.", 500));
    }
});
