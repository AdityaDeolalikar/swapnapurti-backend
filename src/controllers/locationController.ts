import { Request, Response, NextFunction } from "express";
import { locationService } from "../services/locationService";

export class LocationController {
  async getAllLocations(req: Request, res: Response, next: NextFunction) {
    try {
      const locations = await locationService.getAllLocations();
      res.json({
        success: true,
        data: locations,
      });
    } catch (error) {
      next(error);
    }
  }

  async getLocationById(req: Request, res: Response, next: NextFunction) {
    try {
      const location = await locationService.getLocationById(req.params.id);
      if (!location) {
        return res.status(404).json({ message: "Location not found" });
      }
      res.json({
        success: true,
        data: location,
      });
    } catch (error) {
      next(error);
    }
  }

  async createLocation(req: Request, res: Response, next: NextFunction) {
    try {
      const location = await locationService.createLocation(req.body);
      res.status(201).json({
        success: true,
        data: location,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateLocation(req: Request, res: Response, next: NextFunction) {
    try {
      const location = await locationService.updateLocation(
        req.params.id,
        req.body
      );
      if (!location) {
        return res.status(404).json({ message: "Location not found" });
      }
      res.json({
        success: true,
        data: location,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteLocation(req: Request, res: Response, next: NextFunction) {
    try {
      const location = await locationService.deleteLocation(req.params.id);
      if (!location) {
        return res.status(404).json({ message: "Location not found" });
      }
      res.json({
        success: true,
        message: "Location deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export const locationController = new LocationController();
