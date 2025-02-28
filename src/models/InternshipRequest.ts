import mongoose, { Document, Schema } from "mongoose";

export interface IInternshipRequest extends Document {
  type: "Internship" | "Apprenticeship";
  duration: number;
  location: mongoose.Types.ObjectId;
  startDate: Date;
  endDate: Date;
  role: string;
  resumeUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const internshipRequestSchema = new Schema<IInternshipRequest>(
  {
    type: {
      type: String,
      enum: ["Internship", "Apprenticeship"],
      required: true,
    },
    duration: {
      type: Number,
      required: true,
      min: 1,
    },
    location: {
      type: Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    resumeUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const InternshipRequest = mongoose.model<IInternshipRequest>(
  "InternshipRequest",
  internshipRequestSchema
);
