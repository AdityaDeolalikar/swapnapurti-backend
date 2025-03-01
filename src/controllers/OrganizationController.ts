import { Request, Response } from "express";
import { OrganizationService } from "../services/OrganizationService";

export class OrganizationController {
  private organizationService: OrganizationService;

  constructor() {
    this.organizationService = new OrganizationService();
  }

  createOrganization = async (req: Request, res: Response): Promise<void> => {
    try {
      const organization = await this.organizationService.createOrganization(
        req.body
      );
      res.status(201).json(organization);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  };

  getAllOrganizations = async (_req: Request, res: Response): Promise<void> => {
    try {
      const organizations =
        await this.organizationService.getAllOrganizations();
      res.status(200).json(organizations);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  getOrganizationById = async (req: Request, res: Response): Promise<void> => {
    try {
      const organization = await this.organizationService.getOrganizationById(
        req.params.id
      );
      if (!organization) {
        res.status(404).json({ message: "Organization not found" });
        return;
      }
      res.status(200).json(organization);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  };

  updateOrganization = async (req: Request, res: Response): Promise<void> => {
    try {
      const organization = await this.organizationService.updateOrganization(
        req.params.id,
        req.body
      );
      if (!organization) {
        res.status(404).json({ message: "Organization not found" });
        return;
      }
      res.status(200).json(organization);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  };

  deleteOrganization = async (req: Request, res: Response): Promise<void> => {
    try {
      const organization = await this.organizationService.deleteOrganization(
        req.params.id
      );
      if (!organization) {
        res.status(404).json({ message: "Organization not found" });
        return;
      }
      res.status(200).json({ message: "Organization deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  };

  getOrganizationsByDistrict = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const organizations =
        await this.organizationService.getOrganizationsByDistrict(
          req.params.district
        );
      res.status(200).json(organizations);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  assignOrganization = async (req: Request, res: Response): Promise<void> => {
    try {
      const { organizationId, userId } = req.body;
      const organization = await this.organizationService.assignOrganization(
        organizationId,
        userId
      );
      if (!organization) {
        res.status(404).json({ message: "Organization not found" });
        return;
      }
      res.status(200).json(organization);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  };
}
