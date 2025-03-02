import { locationService } from "../services/locationService";
import { AppRequestHandler } from "../common/types/request";
import { ILocation } from "../models/Location";
import AppError from "../core/errors/app-error";

export class LocationController {
  getAllLocations: AppRequestHandler = async (req, res, next) => {
    try {
      const locations = await locationService.getAllLocations();
      res.json({
        success: true,
        data: locations,
      });
    } catch (error) {
      next(error);
    }
  };

  getLocationById: AppRequestHandler<
    ILocation,
    unknown,
    unknown,
    { id: string }
  > = async (req, res, next) => {
    try {
      const location = await locationService.getLocationById(req.params.id);
      if (!location) {
        throw new AppError("Location not found", 404);
      }
      res.json({
        success: true,
        data: location,
      });
    } catch (error) {
      next(error);
    }
  };

  createLocation: AppRequestHandler<ILocation, ILocation, unknown, unknown> =
    async (req, res, next) => {
      try {
        const location = await locationService.createLocation(req.body);
        res.status(201).json({
          success: true,
          data: location,
        });
      } catch (error) {
        next(error);
      }
    };

  updateLocation: AppRequestHandler<
    ILocation,
    ILocation,
    unknown,
    { id: string }
  > = async (req, res, next) => {
    try {
      const location = await locationService.updateLocation(
        req.params.id,
        req.body
      );
      if (!location) {
        throw new AppError("Location not found", 404);
      }
      res.json({
        success: true,
        data: location,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteLocation: AppRequestHandler<unknown, unknown, unknown, { id: string }> =
    async (req, res, next) => {
      try {
        const location = await locationService.deleteLocation(req.params.id);
        if (!location) {
          throw new AppError("Location not found", 404);
        }
        res.json({
          success: true,
          message: "Location deleted successfully",
        });
      } catch (error) {
        next(error);
      }
    };
}

export const locationController = new LocationController();
