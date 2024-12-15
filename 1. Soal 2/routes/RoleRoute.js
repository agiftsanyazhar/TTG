import express from "express";
import {
  getRoles,
  getRoleById,
} from "../controllers/masterdata/RoleController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/role", verifyToken, getRoles);
router.get("/role/:id", verifyToken, getRoleById);

export default router;
