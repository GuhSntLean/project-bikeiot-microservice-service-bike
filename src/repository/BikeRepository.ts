import { AppDataSource } from "../config/AppDataSource";
import { Bike } from "../models/Bike";

class BikeRepository {
  getRepositoryBike = AppDataSource.getRepository(Bike);
}

export { BikeRepository };
