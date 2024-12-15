import express from "express";
import {
  getUsers,
  getUserById,
  countUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user/UserController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/user", verifyToken, getUsers);
router.get("/user/:id", verifyToken, getUserById);
router.get("/total-user", verifyToken, countUser);
router.post("/user", verifyToken, createUser);
router.patch("/user/:id", verifyToken, updateUser);
router.delete("/user/:id", verifyToken, deleteUser);

export default router;
