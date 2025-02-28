import { FilterQuery } from "mongoose";
import JobRequest, { IJobRequest } from "../models/JobRequest";

class JobRequestService {
  async createJobRequest(
    jobRequestData: Partial<IJobRequest>
  ): Promise<IJobRequest> {
    const jobRequest = new JobRequest(jobRequestData);
    return await jobRequest.save();
  }

  async getJobRequests(
    filter: FilterQuery<IJobRequest> = {}
  ): Promise<IJobRequest[]> {
    return await JobRequest.find(filter).populate("location");
  }

  async getJobRequestById(id: string): Promise<IJobRequest | null> {
    return await JobRequest.findById(id).populate("location");
  }

  async updateJobRequest(
    id: string,
    updateData: Partial<IJobRequest>
  ): Promise<IJobRequest | null> {
    return await JobRequest.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteJobRequest(id: string): Promise<IJobRequest | null> {
    return await JobRequest.findByIdAndDelete(id);
  }
}

export default new JobRequestService();
