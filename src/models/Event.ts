import mongoose, { Schema, Document } from "mongoose";
import User from "./User";

export interface IItinerary {
  time: string;
  activity: string;
}

export interface IDayItinerary {
  day: number;
  itinerary: IItinerary[];
}

export interface IEligibility {
  district?: string;
  organization?: string;
  gender?: "male" | "female" | "all";
}

export interface IEvent extends Document {
  name: string;
  description: string;
  fee: number;
  availableSpots: number;
  startDate: Date;
  endDate: Date;
  location: mongoose.Types.ObjectId;
  contactNumber: string;
  eventItineraries: IDayItinerary[];
  importantInstruction: string;
  eligibility: IEligibility;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  status: "APPROVED" | "REJECTED" | "PENDING";
}

const EventSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    fee: {
      type: Number,
      required: true,
      min: 0,
    },
    availableSpots: {
      type: Number,
      required: true,
      min: 0,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    location: {
      type: Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    eventItineraries: [
      {
        day: {
          type: Number,
          required: true,
        },
        itinerary: [
          {
            time: {
              type: String,
              required: true,
            },
            activity: {
              type: String,
              required: true,
            },
          },
        ],
      },
    ],
    importantInstruction: {
      type: String,
      required: true,
    },
    eligibility: {
      district: String,
      organization: String,
      gender: {
        type: String,
        enum: ["male", "female", "all"],
        default: "all",
      },
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["APPROVED", "REJECTED", "PENDING"],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  }
);

export const Event = mongoose.model<IEvent>("Event", EventSchema);
