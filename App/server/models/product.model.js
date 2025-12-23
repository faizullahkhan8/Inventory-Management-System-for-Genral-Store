import mongoose, { model, Schema } from "mongoose";

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        sku: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        purchasedPrice: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },
        sellingPrice: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },
        inventoryId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Inventory",
            required: true,
        },
        mfgDate: {
            type: Date,
        },
        expDate: {
            type: Date,
        },
        supplierId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Supplier",
        },
        categoryId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Category",
            required: true,
        },
        imageUrl: {
            type: String,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        customFields: [
            {
                fieldKey: String,
                fieldValue: String,
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default productSchema;
