import { InternshipRequestService } from "../services/internshipRequestService";
import { AppRequestHandler } from "../common/types/request";
import { IInternshipRequest } from "../models/InternshipRequest";
import AppError from "../core/errors/app-error";

const internshipRequestService = new InternshipRequestService();

export class InternshipRequestController {
  createInternshipRequest: AppRequestHandler<
    IInternshipRequest,
    IInternshipRequest
  > = async (req, res, next) => {
    try {
      const internshipRequest =
        await internshipRequestService.createInternshipRequest(req.body);

      res.status(201).json({
        success: true,
        data: internshipRequest,
      });
    } catch (error) {
      next(error);
    }
  };

  getInternshipRequest: AppRequestHandler<
    IInternshipRequest,
    unknown,
    unknown,
    { id: string }
  > = async (req, res, next) => {
    try {
      const internshipRequest =
        await internshipRequestService.getInternshipRequest(req.params.id);

      if (!internshipRequest) {
        throw new AppError("Internship request not found", 404);
      }

      res.status(200).json({
        success: true,
        data: internshipRequest,
      });
    } catch (error) {
      next(error);
    }
  };

  getAllInternshipRequests: AppRequestHandler<
    IInternshipRequest[],
    unknown,
    unknown,
    unknown
  > = async (req, res, next) => {
    try {
      const internshipRequests =
        await internshipRequestService.getAllInternshipRequests();

      res.status(200).json({
        success: true,
        data: internshipRequests,
      });
    } catch (error) {
      next(error);
    }
  };

  updateInternshipRequest: AppRequestHandler<
    IInternshipRequest,
    IInternshipRequest,
    unknown,
    { id: string }
  > = async (req, res, next) => {
    try {
      const internshipRequest =
        await internshipRequestService.updateInternshipRequest(
          req.params.id,
          req.body
        );
      if (!internshipRequest) {
        throw new AppError("Internship request not found", 404);
      }
      res.status(200).json({
        success: true,
        data: internshipRequest,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteInternshipRequest: AppRequestHandler<
    unknown,
    unknown,
    unknown,
    { id: string }
  > = async (req, res, next) => {
    try {
      await internshipRequestService.deleteInternshipRequest(req.params.id);
      res.status(204).json({
        success: true,
        data: null,
      });
    } catch (error) {
      next(error);
    }
  };
}
