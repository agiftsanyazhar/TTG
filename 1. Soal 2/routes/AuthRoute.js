import express from "express";
import {
  login,
  logout,
} from "../controllers/auth/AuthenticatedSessionController.js";
import { register } from "../controllers/auth/RegisterController.js";
import { refreshToken } from "../controllers/auth/RefreshToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.delete("/logout", logout);
router.get("/token", refreshToken);

export default router;
