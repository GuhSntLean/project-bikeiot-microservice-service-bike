import { AppDataSource } from "../config/AppDataSource";
import { Bike } from "../models/Bike";

const getRepositoryUserAdmin = AppDataSource.getRepository(Bike);

export { getRepositoryUserAdmin };
