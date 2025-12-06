// utils/deleteOneWithTrash.js
import expressAsyncHandler from "express-async-handler";
import Trash from "../models/trash.model.js";
import { ErrorResponse } from "./ErrorResponse.js"; // Your custom error class

export const deleteOne = (Model) =>
    expressAsyncHandler(async (req, res, next) => {
        const { id } = req.params;
        const userId = req.session?._id; // logged-in user ID
        const reason = req.body?.reason || "";

        // 1. Check if document exists
        const doc = await Model.findById(id);
        if (!doc) {
            return next(new ErrorResponse(`${Model.modelName} not found`, 404));
        }

        // 2. Check if already in Trash
        const alreadyDeleted = await Trash.findOne({
            collectionName: Model.collection.name,
            "data._id": id,
        });
        if (alreadyDeleted) {
            return next(
                new ErrorResponse(`${Model.modelName} already deleted`, 400)
            );
        }

        // 3. Save to Trash
        await Trash.create({
            originalId: id,
            collectionName: Model.collection.name,
            data: doc.toObject(),
            deletedBy: userId,
            reason,
        });

        // 4. Delete the original document
        await doc.deleteOne(); // hard delete (can switch to soft delete if needed)

        // 5. Return response
        res.status(200).json({
            success: true,
            message: `${Model.modelName} moved to Trash successfully`,
        });
    });
