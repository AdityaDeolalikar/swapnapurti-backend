import express from "express";
import { InternshipRequestController } from "../controllers/internshipRequestController";

const router = express.Router();
const internshipRequestController = new InternshipRequestController();

router
  .route("/")
  .get(internshipRequestController.getAllInternshipRequests)
  .post(internshipRequestController.createInternshipRequest);

router
  .route("/:id")
  .get(internshipRequestController.getInternshipRequest)
  .patch(internshipRequestController.updateInternshipRequest)
  .delete(internshipRequestController.deleteInternshipRequest);

export default router;
