import mongoose, { Document, Schema } from "mongoose";

export interface ILocation extends Document {
  name: string;
  address: string;
  mapsUrl: string;
}

const locationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    mapsUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ILocation>("Location", locationSchema);
