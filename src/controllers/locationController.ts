import { Request, Response } from "express";
import { locationService } from "../services/locationService";

export class LocationController {
  async getAllLocations(req: Request, res: Response) {
    try {
      const locations = await locationService.getAllLocations();
      res.json(locations);
    } catch (error) {
      res.status(500).json({ message: "Error fetching locations", error });
    }
  }

  async getLocationById(req: Request, res: Response) {
    try {
      const location = await locationService.getLocationById(req.params.id);
      if (!location) {
        return res.status(404).json({ message: "Location not found" });
      }
      res.json(location);
    } catch (error) {
      res.status(500).json({ message: "Error fetching location", error });
    }
  }

  async createLocation(req: Request, res: Response) {
    try {
      const location = await locationService.createLocation(req.body);
      res.status(201).json(location);
    } catch (error) {
      res.status(500).json({ message: "Error creating location", error });
    }
  }

  async updateLocation(req: Request, res: Response) {
    try {
      const location = await locationService.updateLocation(
        req.params.id,
        req.body
      );
      if (!location) {
        return res.status(404).json({ message: "Location not found" });
      }
      res.json(location);
    } catch (error) {
      res.status(500).json({ message: "Error updating location", error });
    }
  }

  async deleteLocation(req: Request, res: Response) {
    try {
      const location = await locationService.deleteLocation(req.params.id);
      if (!location) {
        return res.status(404).json({ message: "Location not found" });
      }
      res.json({ message: "Location deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting location", error });
    }
  }
}

export const locationController = new LocationController();
