import expressAsyncHandler from "express-async-handler";
import { ErrorResponse } from "../utils/ErrorResponse.js";
import Supplier from "../models/supplier.model.js";
import { SupplerDto } from "../dto/supplier.dto.js";
import { Types } from "mongoose";
import Trash from "../models/trash.model.js";

export const createSupplier = expressAsyncHandler(async (req, res, next) => {
    try {
        const data = req.body;

        const {
            name,
            company,
            contacts,
            totalAmount,
            paymentSnapshots = [],
        } = data;

        console.log(data);

        if (!name || !company || !contacts?.length) {
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

        let tempTotal = 0;
        let remainingDue = Number(totalAmount) || 0;
        let paidAmount = 0;

        if (paymentSnapshots.length > 0) {
            paymentSnapshots.forEach((item) => {
                const amount = Number(item.amount) || 0;

                if (item.actionType === "purchase") {
                    remainingDue += amount;
                    tempTotal += amount;
                } else if (item.actionType === "payment") {
                    remainingDue -= amount;
                    paidAmount += amount;
                }

                item.remainingDueAmount = remainingDue;
            });
        }

        data.paidAmount = paidAmount;
        data.totalAmount = Number(totalAmount) + tempTotal;

        await Supplier.create(data);

        return res.status(201).json({
            success: true,
            message: "Supplier created successfully.",
        });
    } catch (error) {
        console.log("Error in create supplier:", error);
        return next(new ErrorResponse("Internal server error", 500));
    }
});

export const getAllSupplier = expressAsyncHandler(async (req, res, next) => {
    try {
        const dbSuppliers = await Supplier.find();

        if (dbSuppliers.length < 1) {
            return next(new ErrorResponse("Not found", 404));
        }

        const suppliers = dbSuppliers.map((item) => new SupplerDto(item));

        return res.status(200).json({
            success: true,
            suppliers,
        });
    } catch (error) {
        console.log("Error in get all supplier controller : ", error.message);
        return next(new ErrorResponse("Internal server error", 500));
    }
});

export const getSupplier = expressAsyncHandler(async (req, res, next) => {
    try {
        const id = req.params.id;

        if (!id) {
            return next(
                new ErrorResponse("Please provide a valid supplier id.", 400)
            );
        }

        const dbSupplier = await Supplier.findById(id);

        if (!dbSupplier) {
            return next(new ErrorResponse("Supplier not found.", 404));
        }

        return res.status(200).json({
            success: true,
            supplier: new SupplerDto(dbSupplier),
        });
    } catch (error) {
        console.log("Error in get supplier controller : ", error.message);
        return next(new ErrorResponse("Internal server error.", 500));
    }
});

export const updateSupplier = expressAsyncHandler(async (req, res, next) => {
    try {
        const { id: supplierId } = req.params;
        const data = req.body;

        const dbSupplier = await Supplier.findById(supplierId);

        if (!dbSupplier) {
            return next(new ErrorResponse("Supplier not found.", 404));
        }

        if (data.name) {
            const nameExists = await Supplier.findOne({
                name: data.name,
                _id: { $ne: supplierId },
            });

            if (nameExists) {
                return next(
                    new ErrorResponse(
                        "Supplier with this name already exists",
                        400
                    )
                );
            }
        }

        if (data.company) {
            const companyExists = await Supplier.findOne({
                company: data.company,
                _id: { $ne: supplierId },
            });

            if (companyExists) {
                return next(
                    new ErrorResponse(
                        "Supplier with this company already exists",
                        400
                    )
                );
            }
        }

        const fields = [
            "name",
            "company",
            "email",
            "contacts",
            "address",
            "paymentSnapshots",
            "lastPurchase",
        ];

        fields.forEach((field) => {
            if (data[field] !== undefined) {
                dbSupplier[field] = data[field];
            }
        });

        if (dbSupplier.paymentSnapshots?.length > 0) {
            let tempTotal = 0;
            let paidAmount = 0;
            let remainingDue = 0;

            dbSupplier.paymentSnapshots.forEach((item) => {
                const amount = Number(item.amount) || 0;

                if (item.actionType === "purchase") {
                    tempTotal += amount;
                    remainingDue += amount;
                } else if (item.actionType === "payment") {
                    paidAmount += amount;
                    remainingDue -= amount;
                }

                item.remainingDueAmount = remainingDue;
            });

            dbSupplier.totalAmount = tempTotal;
            dbSupplier.paidAmount = paidAmount;
        }

        await dbSupplier.save({ validateModifiedOnly: true });

        return res.status(200).json({
            success: true,
            supplier: dbSupplier,
            message: "Supplier updated successfully.",
        });
    } catch (error) {
        console.log("Error in update supplier controller:", error.message);
        return next(new ErrorResponse("Internal server error.", 500));
    }
});
