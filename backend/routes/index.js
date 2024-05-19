import express from "express";
import multer from "multer";
import { login } from "../controllers/authController.js";
import { uploadCSV } from "../controllers/uploadController.js";
import { authenticateToken, adminMiddleware } from "../middlewares/auth.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/login", login);
router.post(
  "/upload",
  authenticateToken,
  adminMiddleware,
  upload.single("file"),
  uploadCSV
);

export default router;
