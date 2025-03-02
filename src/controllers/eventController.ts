import { Request, Response, NextFunction } from "express";
import { eventService } from "../services/eventService";
import { ObjectId } from "mongodb";

class EventController {
  async createEvent(
    req: Request & { user: any },
    res: Response,
    next: NextFunction
  ) {
    try {
      const eventData = {
        ...req.body,
        createdBy: req?.user?.userId ?? "67c1fdfb5e4f62dad78409be", // Assuming you have user data in req.user from auth middleware
      };
      const event = await eventService.createEvent(eventData);
      res.status(201).json({
        success: true,
        data: event,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllEvents(req: Request, res: Response, next: NextFunction) {
    try {
      const events = await eventService.getAllEvents(req.query);
      res.json({
        success: true,
        data: events,
      });
    } catch (error) {
      next(error);
    }
  }

  async getEventById(
    req: Request<{ id: string }, any, any, any, Record<string, any>>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const event = await eventService.getEventById(req.params.id);
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      res.json({
        success: true,
        data: event,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateEvent(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const event = await eventService.updateEvent(req.params.id, req.body);
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      res.json({
        success: true,
        data: event,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteEvent(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const event = await eventService.deleteEvent(req.params.id);
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      res.json({
        success: true,
        message: "Event deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async getMyEvents(
    req: Request & { user: any },
    res: Response,
    next: NextFunction
  ) {
    try {
      const events = await eventService.getEventsByCreator(req.user.userId);
      res.json({
        success: true,
        data: events,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateEventStatus(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const event = await eventService.updateEventStatus(
        req.params.id,
        req.body.status
      );
      res.json({
        success: true,
        data: event,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const eventController = new EventController();
