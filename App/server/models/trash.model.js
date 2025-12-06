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
            ref: "User",
        },
        reason: {
            type: String,
        },
    },
    { timestamps: true }
);

const Trash = model("Trash", trashSchema);

export default Trash;
