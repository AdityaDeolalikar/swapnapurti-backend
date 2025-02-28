import mongoose, { Document, Schema } from "mongoose";

export interface IJobRequest extends Document {
  role: string;
  location: Schema.Types.ObjectId;
  education: string;
  startDate: Date;
  yearsOfExperience: number;
  expectedSalary: number;
  whyToHire: string;
  resumeUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const jobRequestSchema = new Schema<IJobRequest>(
  {
    role: {
      type: String,
      required: true,
    },
    location: {
      type: Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
    education: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    yearsOfExperience: {
      type: Number,
      required: true,
    },
    expectedSalary: {
      type: Number,
      required: true,
    },
    whyToHire: {
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

export default mongoose.model<IJobRequest>("JobRequest", jobRequestSchema);
