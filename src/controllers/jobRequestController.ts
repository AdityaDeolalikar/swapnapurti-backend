import { Request, Response } from "express";
import jobRequestService from "../services/jobRequestService";

class JobRequestController {
  async createJobRequest(req: Request, res: Response) {
    try {
      const jobRequest = await jobRequestService.createJobRequest(req.body);
      res.status(201).json(jobRequest);
    } catch (error) {
      res.status(400).json({ message: "Error creating job request", error });
    }
  }

  async getJobRequests(req: Request, res: Response) {
    try {
      const jobRequests = await jobRequestService.getJobRequests();
      res.status(200).json(jobRequests);
    } catch (error) {
      res.status(400).json({ message: "Error fetching job requests", error });
    }
  }

  async getJobRequestById(req: Request, res: Response) {
    try {
      const jobRequest = await jobRequestService.getJobRequestById(
        req.params.id
      );
      if (!jobRequest) {
        return res.status(404).json({ message: "Job request not found" });
      }
      res.status(200).json(jobRequest);
    } catch (error) {
      res.status(400).json({ message: "Error fetching job request", error });
    }
  }

  async updateJobRequest(req: Request, res: Response) {
    try {
      const jobRequest = await jobRequestService.updateJobRequest(
        req.params.id,
        req.body
      );
      if (!jobRequest) {
        return res.status(404).json({ message: "Job request not found" });
      }
      res.status(200).json(jobRequest);
    } catch (error) {
      res.status(400).json({ message: "Error updating job request", error });
    }
  }

  async deleteJobRequest(req: Request, res: Response) {
    try {
      const jobRequest = await jobRequestService.deleteJobRequest(
        req.params.id
      );
      if (!jobRequest) {
        return res.status(404).json({ message: "Job request not found" });
      }
      res.status(200).json({ message: "Job request deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: "Error deleting job request", error });
    }
  }
}

export default new JobRequestController();
