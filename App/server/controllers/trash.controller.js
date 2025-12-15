import expressAsyncHandler from "express-async-handler";
import { ErrorResponse } from "../utils/ErrorResponse.js";
import Trash from "../models/trash.model.js";
import { TrashDto } from "../dto/trash.dto.js";
import Inventory from "../models/inventory.model.js";
import fs from "fs";
import path from "path";

export const getAllTrashedItems = expressAsyncHandler(
    async (req, res, next) => {
        try {
            const allTrashedItems = await Trash.find()
                .sort({ deletedAt: -1 })
                .populate(["deletedBy"]);

            const trashedItemsDto = allTrashedItems.map(
                (item) => new TrashDto(item)
            );

            return res.status(200).json({
                success: true,
                message: "All trashed items fetched successfully",
                trashedItems: trashedItemsDto,
            });
        } catch (error) {
            console.log("Error in get all trashed item : ", error.message);
            return next(new ErrorResponse("Internal server error", 500));
        }
    }
);

export const deleteFromTrash = expressAsyncHandler(async (req, res, next) => {
    try {
        const { trashId } = req.params;

        const trashedItems = await Trash.findById(trashId);

        if (!trashedItems) {
            return next(new ErrorResponse("Trashed item not found", 404));
        }

        const filename = trashedItems.data.imageUrl.split("/").pop();

        const filePath = path.join("assets/images/product-images", filename);

        fs.unlink(filePath, () => {
            return next(new ErrorResponse("failed to delete item image.", 400));
        });

        const deletedCount = await Inventory.deleteOne({
            productId: trashedItems.data._id,
        });

        if (deletedCount.deletedCount === 0) {
            return next(
                new ErrorResponse("Associated inventory not found", 404)
            );
        }

        await trashedItems.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Item permanently deleted from trash",
        });
    } catch (error) {
        console.log("Error in delete from trash controller : ", error.message);
        return next(new ErrorResponse("Internal server error", 500));
    }
});
