import { AppDataSource } from "../config/AppDataSource";
import { Bike } from "../models/Bike";

const getRepositoryBike = AppDataSource.getRepository(Bike);

export { getRepositoryBike };
