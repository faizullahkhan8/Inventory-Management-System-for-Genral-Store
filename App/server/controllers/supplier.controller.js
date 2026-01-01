import expressAsyncHandler from "express-async-handler";
import { ErrorResponse } from "../utils/ErrorResponse.js";
import {
    getLocalSupplierModel,
    getLocalTrashModel,
} from "../config/localDb.js";

export const createSupplier = expressAsyncHandler(async (req, res, next) => {
    try {
        const Supplier = getLocalSupplierModel();
        const Trash = getLocalTrashModel();
        if (!Supplier || !Trash)
            return next(new ErrorResponse("Database not initialized.", 500));
        const data = req.body;

        const { name, company, contacts } = data;

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
        const isTrashed = await Trash.findOne({
            "data.name": name,
            "data.company": company,
        });

        if (isTrashed) {
            return next(
                new ErrorResponse(
                    "Supplier with same name and company already exists in the trash.",
                    400
                )
            );
        }

        const supplier = await Supplier.create(data);

        return res.status(201).json({
            success: true,
            message: "Supplier created successfully.",
            supplier,
        });
    } catch (error) {
        console.log("Error in create supplier:", error);
        return next(new ErrorResponse("Internal server error", 500));
    }
});

export const getAllSupplier = expressAsyncHandler(async (req, res, next) => {
    try {
        const Supplier = getLocalSupplierModel();
        if (!Supplier)
            return next(new ErrorResponse("Database not initialized.", 500));
        const dbSuppliers = await Supplier.find();

        return res.status(200).json({
            success: true,
            suppliers: dbSuppliers,
        });
    } catch (error) {
        console.log("Error in get all supplier controller : ", error.message);
        return next(new ErrorResponse("Internal server error", 500));
    }
});

export const getSupplier = expressAsyncHandler(async (req, res, next) => {
    try {
        const Supplier = getLocalSupplierModel();
        if (!Supplier)
            return next(new ErrorResponse("Database not initialized.", 500));
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
            supplier: dbSupplier,
        });
    } catch (error) {
        console.log("Error in get supplier controller : ", error.message);
        return next(new ErrorResponse("Internal server error.", 500));
    }
});

export const updateSupplier = expressAsyncHandler(async (req, res, next) => {
    try {
        const Supplier = getLocalSupplierModel();
        if (!Supplier)
            return next(new ErrorResponse("Database not initialized.", 500));
        const { id: supplierId } = req.params;

        console.log(supplierId);
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

        const fields = ["name", "company", "contacts", "address"];

        fields.forEach((field) => {
            if (data[field] !== undefined) {
                dbSupplier[field] = data[field];
            }
        });

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
