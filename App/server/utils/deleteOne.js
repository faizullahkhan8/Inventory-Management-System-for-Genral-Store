// utils/deleteOneWithTrash.js
import expressAsyncHandler from "express-async-handler";
import { getLocalTrashModel } from "../config/localDb.js";
import { ErrorResponse } from "./ErrorResponse.js";

export const deleteOne = (Model) =>
    expressAsyncHandler(async (req, res, next) => {
        const { id } = req.params;
        const userId = req.session?.user?.id; // logged-in user ID
        const reason = req.body?.reason || "";

        if (!Model)
            return next(new ErrorResponse("Database not initialized.", 500));

        // 1. Check if document exists
        const doc = await Model.findById(id);
        if (!doc) {
            return next(new ErrorResponse(`${Model.modelName} not found`, 404));
        }

        // get Trash model at runtime
        const Trash = getLocalTrashModel();
        if (!Trash)
            return next(new ErrorResponse("Database not initialized.", 500));

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
        await doc.deleteOne();

        // 5. Return response
        res.status(200).json({
            success: true,
            message: `${Model.modelName} moved to Trash successfully`,
        });
    });
