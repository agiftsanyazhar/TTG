import express from "express";
import {
  getPegawais,
  getPegawaiById,
} from "../controllers/user/PegawaiController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/Pegawai", verifyToken, getPegawais);
router.get("/Pegawai/:id", verifyToken, getPegawaiById);

export default router;
