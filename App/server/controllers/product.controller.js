import AsyncHandler from "express-async-handler";
import { ErrorResponse } from "../utils/ErrorResponse.js";

import Product from "../models/product.model.js";
import Inventory from "../models/inventory.model.js";

export const createProduct = AsyncHandler(async (req, res, next) => {
    try {
        const data = req.body;

        if (!data) {
            return next(new ErrorResponse("In-complete product data.", 400));
        }

        const {
            name,
            description,
            sellingPrice,
            purchasedPrice,
            sku,
            quantity,
        } = data;

        if (
            !name ||
            !description ||
            !sellingPrice ||
            !purchasedPrice ||
            !sku ||
            !quantity
        ) {
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

        const newProduct = new Product(data);

        const newInventory = await Inventory.create({
            productId: newProduct._id,
            lastUpdate: Date.now(),
            quantity: data.quantity || 0,
            reservedQuantity: data?.reservedQuantity || 0,
            threshold: data?.threshold || 10,
        });

        newProduct.inventoryId = newInventory._id;
        newProduct.supplierId = "69066452cc22a72016e30125"; // this is temporary
        newProduct.categoryId = "69066452cc22a72016e30125"; // this is temporary

        await newProduct.save({ validateModifiedOnly: true });

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
