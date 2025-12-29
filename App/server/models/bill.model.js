import { Schema, SchemaTypes } from "mongoose";

export const billSchema = new Schema(
    {
        supplierId: {
            type: SchemaTypes.ObjectId,
            ref: "supplier",
            required: true,
        },
        purchaseDate: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: [
                "draft",
                "unpaid",
                "partial",
                "paid",
                "cancelled",
                "returned",
            ],
        },
        paymentType: {
            type: String,
            enum: ["cash", "bank", "online", "cheque"],
        },
        paidAmount: {
            type: Number,
            required: true,
        },
        dueAmount: {
            type: Number,
        },
        total: {
            type: Number,
            required: true,
        },
        note: {
            type: Number,
        },
        items: [
            {
                productId: {
                    type: SchemaTypes.ObjectId,
                    ref: "product",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
                discount: {
                    type: Number,
                },
                total: {
                    type: Number,
                },
            },
        ],
    },
    { timestamps: true }
);
