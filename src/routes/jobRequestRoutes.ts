import express from "express";
import jobRequestController from "../controllers/jobRequestController";

const router = express.Router();

router.post("/", jobRequestController.createJobRequest);
router.get("/", jobRequestController.getJobRequests);
router.get("/:id", jobRequestController.getJobRequestById);
router.put("/:id", jobRequestController.updateJobRequest);
router.delete("/:id", jobRequestController.deleteJobRequest);

export default router;
