import expressAsyncHandler from "express-async-handler";
import { ErrorResponse } from "../utils/ErrorResponse.js";
import { TrashDto } from "../dto/trash.dto.js";
import {
    getLocalTrashModel,
    getLocalInventoryModel,
} from "../config/localDb.js";
import fs from "fs/promises";
import path from "path";

export const getAllTrashedItems = expressAsyncHandler(
    async (req, res, next) => {
        try {
            const Trash = getLocalTrashModel();
            const Inventory = getLocalInventoryModel();
            if (!Trash)
                return next(
                    new ErrorResponse("Database not initialized.", 500)
                );

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

        const Trash = getLocalTrashModel();
        const Inventory = getLocalInventoryModel();
        if (!Trash)
            return next(new ErrorResponse("Database not initialized.", 500));

        const trashedItem = await Trash.findById(trashId);

        if (!trashedItem) {
            return next(new ErrorResponse("Trashed item not found", 404));
        }

        // Delete product image if item is product
        if (trashedItem.collectionName === "products" && trashedItem.data.imageUrl) {
            const filename = trashedItem.data.imageUrl.split("/").pop();

            const filePath = path.join(
                process.cwd(),
                "assets/images/product-images",
                filename
            );

            try {
                await fs.unlink(filePath);
            } catch (err) {
                return next(
                    new ErrorResponse("Failed to delete item image.", 400)
                );
            }

            await Inventory.deleteOne({ productId: trashedItem.data._id });
        }

        // Delete trash record
        await trashedItem.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Item permanently deleted from trash",
        });
    } catch (error) {
        console.log("Error in delete from trash controller:", error.message);
        return next(new ErrorResponse("Internal server error", 500));
    }
});
