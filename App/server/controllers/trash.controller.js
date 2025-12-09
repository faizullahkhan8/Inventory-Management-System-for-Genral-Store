import expressAsyncHandler from "express-async-handler";
import { ErrorResponse } from "../utils/ErrorResponse.js";
import Trash from "../models/trash.model.js";
import { TrashDto } from "../dto/trash.dto.js";

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
