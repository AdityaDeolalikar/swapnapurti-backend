import express from "express";
import jobRequestController from "../controllers/jobRequestController";

const router = express.Router();

router.post("/", jobRequestController.createJobRequest);
router.get("/", jobRequestController.getJobRequests);
//@ts-ignore
router.get("/:id", jobRequestController.getJobRequestById);
//@ts-ignore
router.put("/:id", jobRequestController.updateJobRequest);
//@ts-ignore
router.delete("/:id", jobRequestController.deleteJobRequest);

export default router;
