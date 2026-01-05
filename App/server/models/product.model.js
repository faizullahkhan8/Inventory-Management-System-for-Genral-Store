import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        inventoryId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "inventory",
            required: true,
        },
        categoryId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "category",
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
