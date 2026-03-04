import express from "express";
import { applyToJob, getApplicationsForEmployer } from "../controllers/applicationController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/:jobId", protect, upload.single("resume"), applyToJob);

router.get("/employer", protect, getApplicationsForEmployer);

export default router;