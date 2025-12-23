import { model, Schema } from "mongoose";

const supplierSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },

        company: { type: String, required: true, unique: true },

        email: String,

        contacts: [
            {
                type: {
                    type: String, // mobile, phone, whatsapp
                    required: true,
                },
                number: {
                    type: String,
                    required: true,
                },
            },
        ],

        address: { type: String },

        totalAmount: {
            type: Number,
            default: 0,
        },

        paidAmount: {
            type: Number,
            default: 0,
        },

        lastPurchase: {
            type: Date,
            default: null,
        },

        paymentSnapshots: [
            {
                amount: {
                    type: Number,
                    required: true,
                },

                remainingDueAmount: {
                    type: Number,
                    required: true,
                },

                actionType: {
                    type: String,
                    enum: ["purchase", "payment"],
                    required: true,
                },

                paymentMethod: {
                    type: String,
                },

                timestamp: {
                    type: String,
                },
            },
        ],
    },
    { timestamps: true }
);

export default supplierSchema;
