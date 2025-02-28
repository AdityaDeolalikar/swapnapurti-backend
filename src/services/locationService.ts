import Location, { ILocation } from "../models/Location";

export class LocationService {
  async getAllLocations(): Promise<ILocation[]> {
    return await Location.find();
  }

  async getLocationById(id: string): Promise<ILocation | null> {
    return await Location.findById(id);
  }

  async createLocation(locationData: Partial<ILocation>): Promise<ILocation> {
    const location = new Location(locationData);
    return await location.save();
  }

  async updateLocation(
    id: string,
    locationData: Partial<ILocation>
  ): Promise<ILocation | null> {
    return await Location.findByIdAndUpdate(id, locationData, { new: true });
  }

  async deleteLocation(id: string): Promise<ILocation | null> {
    return await Location.findByIdAndDelete(id);
  }
}

export const locationService = new LocationService();
