import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { getAllTrashedItems } from "../controllers/trash.controller.js";
import { restoreFromTrash } from "../utils/restoreOne.js";

const router = Router();

// Example route
router.get("/test", (req, res) => {
    res.json({ message: "Trash route is working!" });
});

router.get("/get-all", isAuthenticated, getAllTrashedItems);
router.put("/restore/:trashId", isAuthenticated, restoreFromTrash);

export default router;
