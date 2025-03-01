import { Schema, model, Document, Types } from "mongoose";

export interface IOrganization extends Document {
  name: string;
  district: string;
  primaryDiscussion?: {
    status?: boolean;
    document?: string;
  };
  mouSignedStatus?: {
    status?: boolean;
    document?: string;
  };
  orientationStatus?: {
    status?: boolean;
    document?: string;
  };
  dataCollectionStatus?: {
    status?: boolean;
    document?: string;
  };
  hasEntry?: {
    status?: boolean;
    document?: string;
  };
  isApproved: boolean;
  takenBy?: Types.ObjectId;
}

const organizationSchema = new Schema<IOrganization>(
  {
    name: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    primaryDiscussion: {
      status: Boolean,
      document: String,
    },
    mouSignedStatus: {
      status: Boolean,
      document: String,
    },
    orientationStatus: {
      status: Boolean,
      document: String,
    },
    dataCollectionStatus: {
      status: Boolean,
      document: String,
    },
    hasEntry: {
      status: Boolean,
      document: String,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    takenBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Organization = model<IOrganization>(
  "Organization",
  organizationSchema
);
