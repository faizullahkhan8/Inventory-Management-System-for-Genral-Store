// utils/restoreOne.js
import expressAsyncHandler from "express-async-handler";
import Trash from "../models/trash.model.js";
import { ErrorResponse } from "./ErrorResponse.js";

export const restoreOne = (Model) =>
    expressAsyncHandler(async (req, res, next) => {
        const { trashId } = req.params; // Trash document ID
        const userId = req.session?._id; // Optional: logged-in user

        // 1. Find the Trash record
        const trashDoc = await Trash.findById(trashId);
        if (!trashDoc) {
            return next(new ErrorResponse("Trash record not found", 404));
        }

        // 2. Ensure Trash record belongs to the correct collection
        if (trashDoc.collectionName !== Model.collection.name) {
            return next(
                new ErrorResponse(
                    `Trash record does not belong to ${Model.modelName}`,
                    400
                )
            );
        }

        // Insert new document with original _id
        await Model.create({ ...trashDoc.data, _id: trashDoc.data._id });

        // 4. Remove the Trash record
        await trashDoc.deleteOne();

        // 5. Return success
        res.status(200).json({
            success: true,
            message: `${Model.modelName} restored successfully`,
        });
    });
