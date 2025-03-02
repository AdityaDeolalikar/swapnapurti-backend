import { Request, Response, NextFunction } from "express";
import jobRequestService from "../services/jobRequestService";

class JobRequestController {
  async createJobRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const jobRequest = await jobRequestService.createJobRequest(req.body);
      res.status(201).json({
        success: true,
        data: jobRequest,
      });
    } catch (error) {
      next(error);
    }
  }

  async getJobRequests(req: Request, res: Response, next: NextFunction) {
    try {
      const jobRequests = await jobRequestService.getJobRequests();
      res.status(200).json({
        success: true,
        data: jobRequests,
      });
    } catch (error) {
      next(error);
    }
  }

  async getJobRequestById(req: Request, res: Response, next: NextFunction) {
    try {
      const jobRequest = await jobRequestService.getJobRequestById(
        req.params.id
      );
      if (!jobRequest) {
        return res.status(404).json({ message: "Job request not found" });
      }
      res.status(200).json({
        success: true,
        data: jobRequest,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateJobRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const jobRequest = await jobRequestService.updateJobRequest(
        req.params.id,
        req.body
      );
      if (!jobRequest) {
        return res.status(404).json({ message: "Job request not found" });
      }
      res.status(200).json({
        success: true,
        data: jobRequest,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteJobRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const jobRequest = await jobRequestService.deleteJobRequest(
        req.params.id
      );
      if (!jobRequest) {
        return res.status(404).json({ message: "Job request not found" });
      }
      res.status(200).json({
        success: true,
        message: "Job request deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new JobRequestController();
