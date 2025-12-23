import { Schema, SchemaTypes } from "mongoose";

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        parentId: {
            type: SchemaTypes.ObjectId,
            ref: "category",
        },
        status: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

export default categorySchema;
