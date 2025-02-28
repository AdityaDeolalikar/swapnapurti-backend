import { Event, IEvent } from "../models/Event";
import mongoose from "mongoose";

class EventService {
  async createEvent(eventData: Partial<IEvent>): Promise<IEvent> {
    const event = (await Event.create(eventData)).populate(
      "createdBy location"
    );
    return event;
  }

  async getAllEvents(query: any = {}): Promise<IEvent[]> {
    return Event.find(query)
      .populate("createdBy", "name email")
      .populate("location");
  }

  async getEventById(id: string): Promise<IEvent | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid event ID");
    }
    return Event.findById(id)
      .populate("createdBy", "name email")
      .populate("location");
  }

  async updateEvent(
    id: string,
    updateData: Partial<IEvent>
  ): Promise<IEvent | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid event ID");
    }
    return Event.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    )
      .populate("createdBy", "name email")
      .populate("location");
  }

  async deleteEvent(id: string): Promise<IEvent | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid event ID");
    }
    return Event.findByIdAndDelete(id);
  }

  async getEventsByCreator(creatorId: string): Promise<IEvent[]> {
    return Event.find({ createdBy: creatorId })
      .populate("createdBy", "name email")
      .populate("location");
  }

  async updateEventStatus(id: string, status: string): Promise<IEvent | null> {
    return Event.findByIdAndUpdate(id, { status }, { new: true });
  }
}

export const eventService = new EventService();
