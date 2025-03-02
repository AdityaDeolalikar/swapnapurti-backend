import { eventService } from "../services/eventService";
import { AppRequestHandler } from "../common/types/request";
import { IEvent } from "../models/Event";
import AppError from "../core/errors/app-error";

class EventController {
  createEvent: AppRequestHandler<IEvent, IEvent> = async (req, res, next) => {
    try {
      const eventData = {
        ...req.body,
        createdBy: res.locals.user._id,
      };
      const event = await eventService.createEvent(eventData);
      res.status(201).json({
        success: true,
        data: event,
      });
    } catch (error) {
      next(error);
    }
  };

  getAllEvents: AppRequestHandler = async (req, res, next) => {
    try {
      const events = await eventService.getAllEvents(req.query);
      res.json({
        success: true,
        data: events,
      });
    } catch (error) {
      next(error);
    }
  };

  getEventById: AppRequestHandler<IEvent, unknown, unknown, { id: string }> =
    async (req, res, next) => {
      try {
        const event = await eventService.getEventById(req.params.id);
        if (!event) {
          throw new AppError("Event not found", 404);
        }
        res.json({
          success: true,
          data: event,
        });
      } catch (error) {
        next(error);
      }
    };

  updateEvent: AppRequestHandler<IEvent, IEvent, unknown, { id: string }> =
    async (req, res, next) => {
      try {
        const event = await eventService.updateEvent(req.params.id, req.body);
        if (!event) {
          throw new AppError("Event not found", 404);
        }
        res.json({
          success: true,
          data: event,
        });
      } catch (error) {
        next(error);
      }
    };

  deleteEvent: AppRequestHandler<unknown, unknown, unknown, { id: string }> =
    async (req, res, next) => {
      try {
        const event = await eventService.deleteEvent(req.params.id);
        if (!event) {
          throw new AppError("Event not found", 404);
        }
        res.json({
          success: true,
          message: "Event deleted successfully",
        });
      } catch (error) {
        next(error);
      }
    };

  getMyEvents: AppRequestHandler<IEvent[], unknown, unknown, unknown> = async (
    req,
    res,
    next
  ) => {
    try {
      const events = await eventService.getEventsByCreator(
        res.locals.user._id.toString()
      );
      res.json({
        success: true,
        data: events,
      });
    } catch (error) {
      next(error);
    }
  };

  updateEventStatus: AppRequestHandler<
    IEvent,
    IEvent,
    unknown,
    { id: string }
  > = async (req, res, next) => {
    try {
      const event = await eventService.updateEventStatus(
        req.params.id,
        req.body.status
      );
      if (!event) {
        throw new AppError("Event not found", 404);
      }
      res.json({
        success: true,
        data: event,
      });
    } catch (error) {
      next(error);
    }
  };
}
export const eventController = new EventController();
