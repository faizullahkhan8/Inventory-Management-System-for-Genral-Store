import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import {
    createBill,
    getAllBills,
    getBillById,
    updateBill,
} from "../controllers/bill.controller.js";
import { deleteOne } from "../utils/deleteOne.js";
import { getLocalBillModel } from "../config/localDb.js";

const router = new Router();

router.get("/test", (req, res) =>
    res.status(200).json({
        success: true,
        message: "Bill route working...",
    })
);

router.post("/create", isAuthenticated, createBill);
router.get("/get-all", isAuthenticated, getAllBills);
router.get("/get/:id", isAuthenticated, getBillById);
router.put("/update/:id", isAuthenticated, updateBill);
router.delete("/delete/:id", isAuthenticated, deleteOne(getLocalBillModel));

export default router;
