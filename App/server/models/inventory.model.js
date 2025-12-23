import mongoose, { model, Schema } from "mongoose";

const inventorySchema = new Schema(
    {
        productId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Product",
            required: true,
        },
        quantity: {
            type: Number,
            default: 0,
        },
        lastUpdate: {
            type: Date,
        },
        threshold: {
            type: Number,
        },
        reservedQuantity: {
            type: Number,
            default: 100,
        },
    },
    {
        timestamps: true,
    }
);

export default inventorySchema;
