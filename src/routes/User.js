import express from "express";

import {
  deleteUserController,
  forgotPassword,
  getUserController,
  getUsersController,
  loginController,
  logoutController,
  refreshAccessToken,
  registerController,
  resetPassword,
  updateUserController,
} from "../controllers/user.js";
import { isAdmin, verifyAccessToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/login", loginController);

router.get("/logout", logoutController);

router.post("/register", registerController);

router.post("/forgotpassword", forgotPassword);

router.post("/refreshtoken", refreshAccessToken);

router.put("/resetpassword", resetPassword);

router.get("/:id", verifyAccessToken, getUserController);

router.put("/:id", verifyAccessToken, updateUserController);

router.delete("/:id", [verifyAccessToken, isAdmin], deleteUserController);

router.get("/", [verifyAccessToken, isAdmin], getUsersController);

export default router;
