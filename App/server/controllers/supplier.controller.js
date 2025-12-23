import expressAsyncHandler from "express-async-handler";
import { ErrorResponse } from "../utils/ErrorResponse.js";
import {
    getLocalSupplierModel,
    getLocalTrashModel,
} from "../config/localDb.js";
import { SupplerDto } from "../dto/supplier.dto.js";
import { Types } from "mongoose";

export const createSupplier = expressAsyncHandler(async (req, res, next) => {
    try {
        const Supplier = getLocalSupplierModel();
        const Trash = getLocalTrashModel();
        if (!Supplier || !Trash)
            return next(new ErrorResponse("Database not initialized.", 500));
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
                    if (!item.paymentMethod) {
                        return next(
                            new ErrorResponse(
                                `Please provide payment method for amount : ${item.amount}`
                            )
                        );
                    }
                    if (amount > remainingDue) {
                        return next(
                            new ErrorResponse(
                                "Amount is greater then Total.",
                                400
                            )
                        );
                    }
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
        const Supplier = getLocalSupplierModel();
        if (!Supplier)
            return next(new ErrorResponse("Database not initialized.", 500));
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
            supplier: new SupplerDto(dbSupplier),
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
            supplier: new SupplerDto(dbSupplier),
            message: "Supplier updated successfully.",
        });
    } catch (error) {
        console.log("Error in update supplier controller:", error.message);
        return next(new ErrorResponse("Internal server error.", 500));
    }
});

export const addPayment = expressAsyncHandler(async (req, res, next) => {
    try {
        const Supplier = getLocalSupplierModel();
        if (!Supplier)
            return next(new ErrorResponse("Database not initialized.", 500));
        const { amount, actionType, paymentMethod, timestamp, supplierId } =
            req.body || {};

        // ✅ Basic validation
        if (!supplierId || !amount || !actionType || !timestamp) {
            return next(
                new ErrorResponse("Please provide all required fields.", 400)
            );
        }

        if (Number(amount) <= 0) {
            return next(
                new ErrorResponse(
                    "Amount should be a positive non-zero number.",
                    400
                )
            );
        }

        if (
            actionType === "payment" &&
            (!paymentMethod || paymentMethod === "")
        ) {
            return next(
                new ErrorResponse(
                    "Please provide payment method for payment.",
                    400
                )
            );
        }

        // ✅ Find supplier
        const supplier = await Supplier.findById(supplierId);

        if (!supplier) {
            return next(new ErrorResponse("Supplier not found!", 404));
        }

        let newPaidAmount = supplier.paidAmount || 0;
        let newTotalAmount = supplier.totalAmount || 0;

        // ✅ Handle PAYMENT
        if (actionType === "payment") {
            if (newPaidAmount + Number(amount) > newTotalAmount) {
                return next(
                    new ErrorResponse("Payment exceeds total amount.", 400)
                );
            }

            newPaidAmount += Number(amount);
        }

        // ✅ Handle PURCHASE
        if (actionType === "purchase") {
            newTotalAmount += Number(amount);
        }

        const remainingDueAmount = Math.max(newTotalAmount - newPaidAmount, 0);

        // ✅ Push history
        supplier.paymentSnapshots.push({
            amount: Number(amount),
            actionType,
            paymentMethod: actionType === "payment" ? paymentMethod : null,
            timestamp,
            remainingDueAmount,
        });

        // ✅ Update supplier totals
        supplier.paidAmount = newPaidAmount;
        supplier.totalAmount = newTotalAmount;

        await supplier.save();

        return res.status(201).json({
            success: true,
            message:
                actionType === "payment"
                    ? "Payment added successfully!"
                    : "Purchase added successfully!",
            supplier: new SupplerDto(supplier),
        });
    } catch (error) {
        console.error("Add payment/purchase error:", error);
        return next(new ErrorResponse("Internal server error.", 500));
    }
});

export const updatePayment = expressAsyncHandler(async (req, res, next) => {
    try {
        const Supplier = getLocalSupplierModel();
        if (!Supplier)
            return next(new ErrorResponse("Database not initialized.", 500));
        const {
            supplierId,
            snapshotId,
            amount,
            actionType,
            paymentMethod,
            timestamp,
        } = req.body || {};

        // ✅ Basic validation
        if (
            !supplierId ||
            !snapshotId ||
            !amount ||
            !actionType ||
            !timestamp
        ) {
            return next(
                new ErrorResponse("Please provide all required fields.", 400)
            );
        }

        if (Number(amount) <= 0) {
            return next(
                new ErrorResponse(
                    "Amount should be a positive non-zero number.",
                    400
                )
            );
        }

        if (
            actionType === "payment" &&
            (!paymentMethod || paymentMethod === "")
        ) {
            return next(
                new ErrorResponse(
                    "Please provide payment method for payment.",
                    400
                )
            );
        }

        // ✅ Find supplier
        const supplier = await Supplier.findById(supplierId);

        if (!supplier) {
            return next(new ErrorResponse("Supplier not found!", 404));
        }

        // ✅ Find old snapshot
        const snapshot = supplier.paymentSnapshots.id(snapshotId);

        if (!snapshot) {
            return next(new ErrorResponse("Payment record not found!", 404));
        }

        let newPaidAmount = supplier.paidAmount || 0;
        let newTotalAmount = supplier.totalAmount || 0;

        // 🔁 REVERSE OLD SNAPSHOT EFFECT
        if (snapshot.actionType === "payment") {
            newPaidAmount -= Number(snapshot.amount);
        }

        if (snapshot.actionType === "purchase") {
            newTotalAmount -= Number(snapshot.amount);
        }

        // ❗ Safety
        newPaidAmount = Math.max(newPaidAmount, 0);
        newTotalAmount = Math.max(newTotalAmount, 0);

        // ➕ APPLY NEW SNAPSHOT EFFECT
        if (actionType === "payment") {
            if (newPaidAmount + Number(amount) > newTotalAmount) {
                return next(
                    new ErrorResponse("Payment exceeds total amount.", 400)
                );
            }

            newPaidAmount += Number(amount);
        }

        if (actionType === "purchase") {
            newTotalAmount += Number(amount);
        }

        const remainingDueAmount = Math.max(newTotalAmount - newPaidAmount, 0);

        // ✅ UPDATE SNAPSHOT
        snapshot.amount = Number(amount);
        snapshot.actionType = actionType;
        snapshot.paymentMethod =
            actionType === "payment" ? paymentMethod : null;
        snapshot.timestamp = timestamp;
        snapshot.remainingDueAmount = remainingDueAmount;

        // ✅ UPDATE TOTALS
        supplier.paidAmount = newPaidAmount;
        supplier.totalAmount = newTotalAmount;

        await supplier.save();

        return res.status(200).json({
            success: true,
            message: "Payment/Purchase updated successfully!",
            supplier: new SupplerDto(supplier),
        });
    } catch (error) {
        console.error("Update payment error:", error);
        return next(new ErrorResponse("Internal server error.", 500));
    }
});

export const deletePayment = expressAsyncHandler(async (req, res, next) => {
    try {
        const Supplier = getLocalSupplierModel();
        if (!Supplier) {
            return next(new ErrorResponse("Database not initialized.", 500));
        }

        const { supplierId, paymentId } = req.params || {};

        // ✅ Validation
        if (!supplierId || !paymentId) {
            return next(
                new ErrorResponse(
                    "Supplier ID and Payment ID are required.",
                    400
                )
            );
        }

        // ✅ Find supplier
        const supplier = await Supplier.findById(supplierId);
        if (!supplier) {
            return next(new ErrorResponse("Supplier not found!", 404));
        }

        // ✅ Find snapshot
        const payment = supplier.paymentSnapshots.find(
            (item) => item._id.toString() === paymentId
        );

        if (!payment) {
            return next(new ErrorResponse("Payment record not found!", 404));
        }

        let newPaidAmount = supplier.paidAmount || 0;
        let newTotalAmount = supplier.totalAmount || 0;

        // 🔁 REVERSE SNAPSHOT EFFECT
        if (payment.actionType === "payment") {
            newPaidAmount -= Number(payment.amount);
        }

        if (payment.actionType === "purchase") {
            newTotalAmount -= Number(payment.amount);
        }

        // ❗ Safetyd
        newPaidAmount = Math.max(newPaidAmount, 0);
        newTotalAmount = Math.max(newTotalAmount, 0);

        const remainingDueAmount = Math.max(newTotalAmount - newPaidAmount, 0);

        // ❌ REMOVE SNAPSHOT
        const tempPayments = supplier.paymentSnapshots.filter(
            (item) => item._id.toString() !== paymentId
        );

        supplier.paymentSnapshots = tempPayments;

        // ✅ UPDATE TOTALS
        supplier.paidAmount = newPaidAmount;
        supplier.totalAmount = newTotalAmount;

        // (optional) update last remainingDueAmount on all snapshots
        supplier.paymentSnapshots.forEach((snap) => {
            snap.remainingDueAmount = remainingDueAmount;
        });

        await supplier.save();

        return res.status(200).json({
            success: true,
            message: "Payment/Purchase deleted successfully!",
            supplier: new SupplerDto(supplier),
        });
    } catch (error) {
        console.error("Delete payment error:", error);
        return next(new ErrorResponse("Internal server error.", 500));
    }
});
