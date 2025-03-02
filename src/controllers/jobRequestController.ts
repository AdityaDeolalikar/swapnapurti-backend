import jobRequestService from "../services/jobRequestService";
import { AppRequestHandler } from "../common/types/request";
import { IJobRequest } from "../models/JobRequest";
import AppError from "../core/errors/app-error";

class JobRequestController {
  createJobRequest: AppRequestHandler<
    IJobRequest,
    IJobRequest,
    unknown,
    unknown
  > = async (req, res, next) => {
    try {
      const jobRequest = await jobRequestService.createJobRequest(req.body);
      res.status(201).json({
        success: true,
        data: jobRequest,
      });
    } catch (error) {
      next(error);
    }
  };

  getJobRequests: AppRequestHandler<IJobRequest[], unknown, unknown, unknown> =
    async (req, res, next) => {
      try {
        const jobRequests = await jobRequestService.getJobRequests();
        res.status(200).json({
          success: true,
          data: jobRequests,
        });
      } catch (error) {
        next(error);
      }
    };

  getJobRequestById: AppRequestHandler<
    IJobRequest,
    unknown,
    unknown,
    { id: string }
  > = async (req, res, next) => {
    try {
      const jobRequest = await jobRequestService.getJobRequestById(
        req.params.id
      );
      if (!jobRequest) {
        throw new AppError("Job request not found", 404);
      }
      res.status(200).json({
        success: true,
        data: jobRequest,
      });
    } catch (error) {
      next(error);
    }
  };

  updateJobRequest: AppRequestHandler<
    IJobRequest,
    IJobRequest,
    unknown,
    { id: string }
  > = async (req, res, next) => {
    try {
      const jobRequest = await jobRequestService.updateJobRequest(
        req.params.id,
        req.body
      );
      if (!jobRequest) {
        throw new AppError("Job request not found", 404);
      }
      res.status(200).json({
        success: true,
        data: jobRequest,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteJobRequest: AppRequestHandler<
    unknown,
    unknown,
    unknown,
    { id: string }
  > = async (req, res, next) => {
    try {
      const jobRequest = await jobRequestService.deleteJobRequest(
        req.params.id
      );
      if (!jobRequest) {
        throw new AppError("Job request not found", 404);
      }
      res.status(200).json({
        success: true,
        message: "Job request deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };
}

export default new JobRequestController();
