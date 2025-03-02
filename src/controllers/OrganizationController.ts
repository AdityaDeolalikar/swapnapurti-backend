import { Request, Response, NextFunction } from "express";
import { OrganizationService } from "../services/OrganizationService";
import AppError from "../core/errors/app-error";
import { AppRequestHandler } from "../common/types/request";
import { IOrganization } from "../models/Organization";

export class OrganizationController {
  private organizationService: OrganizationService;

  constructor() {
    this.organizationService = new OrganizationService();
  }

  createOrganization: AppRequestHandler<
    IOrganization,
    IOrganization,
    unknown,
    unknown
  > = async (req, res, next) => {
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

  getAllOrganizations: AppRequestHandler<
    IOrganization[],
    unknown,
    { orientationStatus: string },
    unknown
  > = async (req, res, next) => {
    try {
      const organizations = await this.organizationService.getAllOrganizations(
        req.query
      );
      res.status(200).json({
        success: true,
        data: organizations,
      });
    } catch (error) {
      next(error);
    }
  };

  getOrganizationById: AppRequestHandler<
    IOrganization,
    unknown,
    unknown,
    { id: string }
  > = async (req, res, next) => {
    try {
      const organization = await this.organizationService.getOrganizationById(
        req.params.id
      );
      if (!organization) {
        throw new AppError("Organization not found", 404);
      }
      res.status(200).json({
        success: true,
        data: organization,
      });
    } catch (error) {
      next(error);
    }
  };

  updateOrganization: AppRequestHandler<
    IOrganization,
    IOrganization,
    unknown,
    { id: string }
  > = async (req, res, next) => {
    try {
      const organization = await this.organizationService.updateOrganization(
        req.params.id,
        req.body
      );
      if (!organization) {
        throw new AppError("Organization not found", 404);
      }
      res.status(200).json({
        success: true,
        data: organization,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteOrganization: AppRequestHandler<
    unknown,
    unknown,
    unknown,
    { id: string }
  > = async (req, res, next) => {
    try {
      const organization = await this.organizationService.deleteOrganization(
        req.params.id
      );
      if (!organization) {
        throw new AppError("Organization not found", 404);
      }
      res.status(200).json({
        success: true,
        message: "Organization deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  getOrganizationsByDistrict: AppRequestHandler<
    IOrganization[],
    unknown,
    unknown,
    { district: string }
  > = async (req, res, next) => {
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

  // assignOrganization: AppRequestHandler<
  //   IOrganization,
  //   IOrganization,
  //   unknown,
  //   { organizationId: string; userId: string }
  // > = async (req, res, next) => {
  //   try {
  //     const { organizationId, userId } = req.body;
  //     const organization = await this.organizationService.assignOrganization(
  //       organizationId,
  //       userId
  //     );
  //     if (!organization) {
  //       throw new AppError("Organization not found", 404);
  //     }
  //     res.status(200).json({
  //       success: true,
  //       data: organization,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // };
}
