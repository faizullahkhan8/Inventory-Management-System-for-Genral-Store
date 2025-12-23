// utils/restoreOne.js
import expressAsyncHandler from "express-async-handler";
import { getLocalTrashModel } from "../config/localDb.js";
import { ErrorResponse } from "./ErrorResponse.js";
import { modelMap } from "./modelMap.js";

export const restoreFromTrash = expressAsyncHandler(async (req, res, next) => {
    const { trashId } = req.params; // ID of trash record
    const Trash = getLocalTrashModel();
    if (!Trash)
        return next(new ErrorResponse("Database not initialized.", 500));

    const trashDoc = await Trash.findById(trashId);

    if (!trashDoc) {
        return next(new ErrorResponse("Trash record not found", 404));
    }

    const { collectionName, data } = trashDoc;
    const getter = modelMap[collectionName];
    const Model = typeof getter === "function" ? getter() : getter;

    if (!Model) {
        return next(
            new ErrorResponse(
                `No model found for collection: ${collectionName}`,
                400
            )
        );
    }

    // Restore document with original _id
    await Model.create({ ...data, _id: data._id });

    // Remove the trash record
    await trashDoc.deleteOne();

    res.status(200).json({
        success: true,
        message: `${Model.modelName} restored successfully`,
    });
});
