import { Request, Response, NextFunction } from "express";
import { OrganizationService } from "../services/OrganizationService";
import AppError from "../core/errors/app-error";

export class OrganizationController {
  private organizationService: OrganizationService;

  constructor() {
    this.organizationService = new OrganizationService();
  }

  createOrganization = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const organization = await this.organizationService.createOrganization(
        req.body
      );
      res.status(201).json({
        success: true,
        data: organization,
      });
    } catch (error) {
      next(error);
    }
  };

  getAllOrganizations = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const organizations =
        await this.organizationService.getAllOrganizations();
      res.status(200).json({
        success: true,
        data: organizations,
      });
    } catch (error) {
      next(error);
    }
  };

  getOrganizationById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const organization = await this.organizationService.getOrganizationById(
        req.params.id
      );
      if (!organization) {
        res.status(404).json({ message: "Organization not found" });
        return;
      }
      res.status(200).json({
        success: true,
        data: organization,
      });
    } catch (error) {
      next(error);
    }
  };

  updateOrganization = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const organization = await this.organizationService.updateOrganization(
        req.params.id,
        req.body
      );
      if (!organization) {
        res.status(404).json({ message: "Organization not found" });
        return;
      }
      res.status(200).json({
        success: true,
        data: organization,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteOrganization = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const organization = await this.organizationService.deleteOrganization(
        req.params.id
      );
      if (!organization) {
        res.status(404).json({
          success: false,
          message: "Organization not found",
        });
        return;
      }
      res.status(200).json({
        success: true,
        message: "Organization deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  getOrganizationsByDistrict = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const organizations =
        await this.organizationService.getOrganizationsByDistrict(
          req.params.district
        );
      res.status(200).json({
        success: true,
        data: organizations,
      });
    } catch (error) {
      next(error);
    }
  };

  assignOrganization = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { organizationId, userId } = req.body;
      const organization = await this.organizationService.assignOrganization(
        organizationId,
        userId
      );
      if (!organization) {
        res.status(404).json({
          success: false,
          message: "Organization not found",
        });
        return;
      }
      res.status(200).json({
        success: true,
        data: organization,
      });
    } catch (error) {
      next(error);
    }
  };
}
