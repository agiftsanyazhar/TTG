import express from "express";
import {
  getJabatans,
  getJabatanById,
} from "../controllers/masterdata/JabatanController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/jabatan", verifyToken, getJabatans);
router.get("/jabatan/:id", verifyToken, getJabatanById);

export default router;
