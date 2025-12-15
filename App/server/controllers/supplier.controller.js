import expressAsyncHandler from "express-async-handler";
import { ErrorResponse } from "../utils/ErrorResponse.js";
import Supplier from "../models/supplier.model.js";

export const createSupplier = expressAsyncHandler(async (req, res, next) => {
    try {
        const data = req.body;
        const { name, company, contacts } = data;

        if (!name || !company || !contacts || contacts.length === 0) {
            return next(
                new ErrorResponse("Please provide all required fields.", 400)
            );
        }

        const isExists = await Supplier.findOne({ name, company });

        if (isExists) {
            return next(
                new ErrorResponse(
                    "Supplier with the same name and company already exists.",
                    400
                )
            );
        }

        await Supplier.create(data);

        return res.status(201).json({
            success: true,
            message: "Supplier created successfully.",
        });
    } catch (error) {
        console.log("Error in create supplier controller : ", error.message);
        return next(new ErrorResponse("Internal server error", 500));
    }
});

export const getAllSupplier = expressAsyncHandler(async (req, res, next) => {
    try {
        const suppliers = await Supplier.find();

        return res.status(200).json({
            success: true,
            data: suppliers,
        });
    } catch (error) {
        console.log("Error in get all supplier controller : ", error.message);
        return next(new ErrorResponse("Internal server error", 500));
    }
});
