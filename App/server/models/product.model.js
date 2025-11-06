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
        purchasePrice: {
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
        inventoryRef: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Inventory",
        },
        mfgDate: {
            type: Date,
        },
        expDate: {
            type: Date,
        },
        supplier: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Supplier",
        },
        category: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Category",
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
                fieldName: String,
                fieldType: String,
                isRequired: Boolean,
                isActive: Boolean,
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Product = model("Product", productSchema);

export default Product;
