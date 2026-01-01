import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import {
    createSupplier,
    getAllSupplier,
    getSupplier,
    updateSupplier,
} from "../controllers/supplier.controller.js";
import { deleteOne } from "../utils/deleteOne.js";
import { getLocalSupplierModel } from "../config/localDb.js";

const router = Router();

router.get("/test", (req, res) => {
    return res.status(200).json({ message: "Supplier Router is working!" });
});

router.post("/create", isAuthenticated, createSupplier);
router.get("/get-all", isAuthenticated, getAllSupplier);
router.delete("/delete/:id", isAuthenticated, deleteOne(getLocalSupplierModel));
router.get("/get/:id", isAuthenticated, getSupplier);
router.put("/update/:id", isAuthenticated, updateSupplier);

export default router;
