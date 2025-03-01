import { Router } from "express";
import { OrganizationController } from "../controllers/OrganizationController";

const organizationRoutes = Router();

const organizationController = new OrganizationController();

organizationRoutes.post("/", organizationController.createOrganization);
organizationRoutes.get("/", organizationController.getAllOrganizations);
organizationRoutes.get("/:id", organizationController.getOrganizationById);
organizationRoutes.put("/:id", organizationController.updateOrganization);
// organizationRoutes.delete("/:id", organizationController.deleteOrganization);

export default organizationRoutes;
