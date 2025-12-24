import { model, Schema } from "mongoose";

const trashSchema = new Schema(
    {
        collectionName: {
            type: String,
            required: true,
        },
        data: {
            type: Schema.Types.Mixed,
            required: true,
        },
        deletedBy: {
            type: Schema.Types.ObjectId,
            ref: "user",
        },
        reason: {
            type: String,
        },
    },
    { timestamps: true }
);

export default trashSchema;
