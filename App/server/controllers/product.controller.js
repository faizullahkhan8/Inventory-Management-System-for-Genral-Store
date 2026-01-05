import AsyncHandler from "express-async-handler";
import { ErrorResponse } from "../utils/ErrorResponse.js";
import fs from "fs";

import {
    getLocalProductModel,
    getLocalInventoryModel,
} from "../config/localDb.js";
import mongoose from "mongoose";
import path from "path";
import ProductDto from "../dto/product.dto.js";

export const createProduct = AsyncHandler(async (req, res, next) => {
    try {
        const Product = getLocalProductModel();
        const Inventory = getLocalInventoryModel();
        if (!Product || !Inventory)
            return next(new ErrorResponse("Database not initialized.", 500));

        const data = JSON.parse(req.body.data);

        if (!data) {
            return next(new ErrorResponse("In-complete product data.", 400));
        }

        const { name } = data;

        if (!name) {
            return next(
                new ErrorResponse("Please provide required fields.", 400)
            );
        }

        const isExist = await Product.findOne({ $or: [{ name }] });

        if (isExist) {
            return next(
                new ErrorResponse("Product with name is already exists", 400)
            );
        }

        const newProduct = new Product({
            ...data,
            imageUrl: `${process.env.BACKEND_SERVER_IMAGE_PATH}/${req.file.filename}`,
        });

        const newInventory = await Inventory.create({
            productId: newProduct._id,
            lastUpdate: Date.now(),
            quantity: 0,
        });

        newProduct.inventoryId = newInventory._id;

        await newProduct.save({ validateModifiedOnly: true });

        return res.status(201).json({
            success: true,
            message: "Product created successfully.",
            product: new ProductDto(newProduct),
        });
    } catch (error) {
        console.log("Error in create product controller.", error.message);
        return next(new ErrorResponse("Internal server error.", 500));
    }
});

export const getAllProducts = AsyncHandler(async (req, res, next) => {
    try {
        const Product = getLocalProductModel();
        if (!Product)
            return next(new ErrorResponse("Database not initialized.", 500));
        const allProducts = await Product.find({})
            .populate("inventoryId")
            .populate("categoryId");

        const filtered = allProducts.map((product) => new ProductDto(product));

        return res.status(200).json({
            success: true,
            Products: filtered,
        });
    } catch (error) {
        console.log("Error in get all products controller: ", error.message);
        return next(new ErrorResponse("Internal server error.", 500));
    }
});

export const getProduct = AsyncHandler(async (req, res, next) => {
    try {
        const Product = getLocalProductModel();
        if (!Product)
            return next(new ErrorResponse("Database not initialized.", 500));
        const productId = req.params.id;

        if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
            return next(new ErrorResponse("Null or invalid product id.", 400));
        }

        const dbProduct = await Product.findById(productId)
            .populate("inventoryId")
            .populate("categoryId");

        if (!dbProduct) {
            return next(new ErrorResponse("Product not found!.", 404));
        }

        return res.status(200).json({
            success: true,
            product: new ProductDto(dbProduct),
        });
    } catch (error) {
        console.log(
            "Error in get products for view controller: ",
            error.message
        );
        return next(new ErrorResponse("Internal server error.", 500));
    }
});

export const updateProduct = AsyncHandler(async (req, res, next) => {
    try {
        const Product = getLocalProductModel();
        if (!Product)
            return next(new ErrorResponse("Database not initialized.", 500));
        const productId = req.params.id;
        const dbProduct = await Product.findById(productId)
            .populate("inventoryId")
            .populate("categoryId");

        const data = JSON.parse(req.body.data);

        if (!dbProduct) {
            return next(new ErrorResponse("Product not found!", 404));
        }

        const isExist = await Product.findOne({
            $or: [{ name: data?.name }, { sku: data?.sku }],
            _id: { $ne: productId }, // Exclude the current product
        });

        if (isExist) {
            return next(
                new ErrorResponse(
                    "Product with name or sku already exists",
                    400
                )
            );
        }

        const fields = [
            "name",
            "description",
            "categoryId",
            "isActive",
            "customFields",
        ];

        fields.forEach((field) => {
            if (data[field] !== undefined) dbProduct[field] = data[field];
        });

        if (req.file) {
            if (dbProduct.imageUrl) {
                const filename = dbProduct.imageUrl.split("/").pop(); // "167344082.jpg"

                // Construct the local file path
                const filePath = path.join(
                    "assets/images/product-images",
                    filename
                );
                fs.unlink(filePath, (err) => {
                    if (err)
                        next(
                            new ErrorResponse(
                                "failed to delete old image!",
                                400
                            )
                        );
                });
                dbProduct.imageUrl = `${process.env.BACKEND_SERVER_IMAGE_PATH}/${req.file.filename}`;
            }
        }

        await dbProduct.save({ validateModifiedOnly: true });

        return res.status(201).json({
            success: true,
            product: new ProductDto(dbProduct),
        });
    } catch (error) {
        console.log("Error in update product controller: ", error.message);
        return next(new ErrorResponse("Internal server error.", 500));
    }
});
