import { Request, Response, NextFunction } from "express";
import { InternshipRequestService } from "../services/internshipRequestService";

const internshipRequestService = new InternshipRequestService();

export class InternshipRequestController {
  createInternshipRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const internshipRequest =
        await internshipRequestService.createInternshipRequest(req.body);

      res.status(201).json({
        status: "success",
        data: internshipRequest,
      });
    } catch (error) {
      next(error);
    }
  };

  getInternshipRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const internshipRequest =
        await internshipRequestService.getInternshipRequest(req.params.id);

      res.status(200).json({
        status: "success",
        data: internshipRequest,
      });
    } catch (error) {
      next(error);
    }
  };

  getAllInternshipRequests = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const internshipRequests =
        await internshipRequestService.getAllInternshipRequests();

      res.status(200).json({
        status: "success",
        data: internshipRequests,
      });
    } catch (error) {
      next(error);
    }
  };

  updateInternshipRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const internshipRequest =
        await internshipRequestService.updateInternshipRequest(
          req.params.id,
          req.body
        );

      res.status(200).json({
        status: "success",
        data: internshipRequest,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  deleteInternshipRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await internshipRequestService.deleteInternshipRequest(req.params.id);
      res.status(204).json({
        status: "success",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  };
}
