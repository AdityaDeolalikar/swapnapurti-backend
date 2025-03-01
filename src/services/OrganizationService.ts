import { IOrganization, Organization } from "../models/Organization";
import { Types } from "mongoose";

export class OrganizationService {
  async createOrganization(
    organizationData: Partial<IOrganization>
  ): Promise<IOrganization> {
    const organization = new Organization(organizationData);
    return await organization.save();
  }

  async getAllOrganizations(): Promise<IOrganization[]> {
    return await Organization.find().populate("takenBy");
  }

  async getOrganizationById(id: string): Promise<IOrganization | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid organization ID");
    }
    return await Organization.findById(id).populate("takenBy");
  }

  async updateOrganization(
    id: string,
    updateData: Partial<IOrganization>
  ): Promise<IOrganization | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid organization ID");
    }
    return await Organization.findByIdAndUpdate(id, updateData, {
      new: true,
    }).populate("takenBy");
  }

  async deleteOrganization(id: string): Promise<IOrganization | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid organization ID");
    }
    return await Organization.findByIdAndDelete(id);
  }

  async getOrganizationsByDistrict(district: string): Promise<IOrganization[]> {
    return await Organization.find({ district }).populate("takenBy");
  }

  async assignOrganization(
    organizationId: string,
    userId: string
  ): Promise<IOrganization | null> {
    if (
      !Types.ObjectId.isValid(organizationId) ||
      !Types.ObjectId.isValid(userId)
    ) {
      throw new Error("Invalid organization or user ID");
    }
    return await Organization.findByIdAndUpdate(
      organizationId,
      { takenBy: userId },
      { new: true }
    ).populate("takenBy");
  }
}
