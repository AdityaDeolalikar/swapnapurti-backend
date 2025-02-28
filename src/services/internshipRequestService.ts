import {
  IInternshipRequest,
  InternshipRequest,
} from "../models/InternshipRequest";

export class InternshipRequestService {
  async createInternshipRequest(
    requestData: Partial<IInternshipRequest>
  ): Promise<IInternshipRequest> {
    const internshipRequest = (
      await InternshipRequest.create(requestData)
    ).populate("location");
    return internshipRequest;
  }

  async getInternshipRequest(id: string): Promise<IInternshipRequest | null> {
    const internshipRequest = await InternshipRequest.findById(id).populate(
      "location"
    );
    if (!internshipRequest) {
      throw new Error("Internship request not found");
    }
    return internshipRequest;
  }

  async getAllInternshipRequests(): Promise<IInternshipRequest[]> {
    return await InternshipRequest.find().populate("location");
  }

  async updateInternshipRequest(
    id: string,
    updateData: Partial<IInternshipRequest>
  ): Promise<IInternshipRequest | null> {
    const internshipRequest = await InternshipRequest.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate("location");

    if (!internshipRequest) {
      throw new Error("Internship request not found");
    }

    return internshipRequest;
  }

  async deleteInternshipRequest(id: string): Promise<void> {
    const result = await InternshipRequest.findByIdAndDelete(id);
    if (!result) {
      throw new Error("Internship request not found");
    }
  }
}
