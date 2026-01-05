import expressAsyncHandler from "express-async-handler";
import { ErrorResponse } from "../utils/ErrorResponse.js";
import { getLocalBillModel } from "../config/localDb.js";

export const createBill = expressAsyncHandler(async (req, res, next) => {
    try {
        const billModel = getLocalBillModel();

        if (!billModel) {
            return next(new ErrorResponse("Database not initialized.", 500));
        }

        const {
            supplierId,
            purchaseDate,
            paymentType,
            paidAmount,
            note,
            items,
        } = req.body;

        if (!supplierId || !purchaseDate || !items?.length) {
            return next(new ErrorResponse("Required fields are missing.", 400));
        }

        let total = 0;

        const billItems = items.map((item) => {
            const itemTotal = item.quantity * item.price - (item.discount || 0);
            total += itemTotal;

            return {
                ...item,
                total: itemTotal,
            };
        });

        const dueAmount = total - (paidAmount || 0);
        const status = total === paidAmount ? "paid" : "partial";

        const bill = await billModel.create({
            supplierId,
            purchaseDate,
            status,
            paymentType,
            paidAmount: paidAmount || 0,
            dueAmount,
            total,
            note,
            items: billItems,
        });

        return res.status(201).json({
            success: true,
            message: "Bill created successfully.",
            bill,
        });
    } catch (error) {
        console.error("Error in create bill:", error.message);
        return next(new ErrorResponse("Internal server error.", 500));
    }
});

export const getAllBills = expressAsyncHandler(async (req, res, next) => {
    try {
        const billModel = getLocalBillModel();

        if (!billModel) {
            return next(new ErrorResponse("Database not initialized.", 500));
        }

        const bills = await billModel
            .find()
            .populate("supplierId", "name company")
            .populate("items.productId", "name");

        return res.status(200).json({
            success: true,
            bills,
        });
    } catch (error) {
        console.error("Error in get all bills:", error.message);
        return next(new ErrorResponse("Internal server error.", 500));
    }
});

export const getBillById = expressAsyncHandler(async (req, res, next) => {
    try {
        const billModel = getLocalBillModel();

        if (!billModel) {
            return next(new ErrorResponse("Database not initialized.", 500));
        }

        const { id } = req.params;

        if (!id) {
            return next(new ErrorResponse("Bill ID is required.", 400));
        }

        const bill = await billModel
            .findById(id)
            .populate("supplierId")
            .populate("items.productId");

        if (!bill) {
            return next(new ErrorResponse("Bill not found.", 404));
        }

        return res.status(200).json({
            success: true,
            bill,
        });
    } catch (error) {
        console.error("Error in get bill by id:", error.message);
        return next(new ErrorResponse("Internal server error.", 500));
    }
});

export const updateBill = expressAsyncHandler(async (req, res, next) => {
    try {
        const billModel = getLocalBillModel();

        if (!billModel) {
            return next(new ErrorResponse("Database not initialized.", 500));
        }

        const { id } = req.params;

        if (!id) {
            return next(new ErrorResponse("Bill ID is required.", 400));
        }

        const bill = await billModel.findById(id);

        if (!bill) {
            return next(new ErrorResponse("Bill not found.", 404));
        }

        const {
            supplierId,
            purchaseDate,
            status,
            paymentType,
            paidAmount,
            note,
            items,
        } = req.body;

        if (supplierId) bill.supplierId = supplierId;
        if (purchaseDate) bill.purchaseDate = purchaseDate;
        if (status) bill.status = status;
        if (paymentType) bill.paymentType = paymentType;
        if (note !== undefined) bill.note = note;

        if (items?.length) {
            let total = 0;

            bill.items = items.map((item) => {
                const itemTotal =
                    item.quantity * item.price - (item.discount || 0);
                total += itemTotal;

                return {
                    ...item,
                    total: itemTotal,
                };
            });

            bill.total = total;
            bill.dueAmount = total - (paidAmount ?? bill.paidAmount);
        }

        if (paidAmount !== undefined) {
            bill.paidAmount = paidAmount;
            bill.dueAmount = bill.total - paidAmount;
        }

        // ===== AUTO STATUS UPDATE =====
        if (bill.paidAmount >= bill.total) {
            bill.status = "paid";
        } else if (bill.paidAmount > 0) {
            bill.status = "partial";
        } else {
            bill.status = "unpaid";
        }

        await bill.save();

        return res.status(200).json({
            success: true,
            message: "Bill updated successfully.",
            bill,
        });
    } catch (error) {
        console.error("Error in update bill:", error.message);
        return next(new ErrorResponse("Internal server error.", 500));
    }
});
