import { Request, Response } from "express";
import { eventService } from "../services/eventService";
import { ObjectId } from "mongodb";

class EventController {
  async createEvent(req: Request & { user: any }, res: Response) {
    try {
      const eventData = {
        ...req.body,
        createdBy: req?.user?.userId ?? "67c1fdfb5e4f62dad78409be", // Assuming you have user data in req.user from auth middleware
      };
      const event = await eventService.createEvent(eventData);
      res.status(201).json(event);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getAllEvents(req: Request, res: Response) {
    try {
      const events = await eventService.getAllEvents(req.query);
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getEventById(
    req: Request<{ id: string }, any, any, any, Record<string, any>>,
    res: Response
  ) {
    try {
      const event = await eventService.getEventById(req.params.id);
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      res.json(event);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async updateEvent(req: Request<{ id: string }>, res: Response) {
    try {
      const event = await eventService.updateEvent(req.params.id, req.body);
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      res.json(event);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async deleteEvent(req: Request<{ id: string }>, res: Response) {
    try {
      const event = await eventService.deleteEvent(req.params.id);
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      res.json({ message: "Event deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getMyEvents(req: Request & { user: any }, res: Response) {
    try {
      const events = await eventService.getEventsByCreator(req.user.userId);
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async updateEventStatus(req: Request<{ id: string }>, res: Response) {
    try {
      const event = await eventService.updateEventStatus(
        req.params.id,
        req.body.status
      );
      res.json(event);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}

export const eventController = new EventController();
