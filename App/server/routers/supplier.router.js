import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import {
    createSupplier,
    getAllSupplier,
} from "../controllers/supplier.controller.js";

const router = Router();

router.get("/test", (req, res) => {
    return res.status(200).json({ message: "Supplier Router is working!" });
});

router.post("/create", isAuthenticated, createSupplier);
router.get("/get-all", isAuthenticated, getAllSupplier);

export default router;
