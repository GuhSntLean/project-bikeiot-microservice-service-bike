import { AppDataSource } from "../config/AppDataSource";
import { ModelBike } from "../models/ModelBike";

const getRepositoryModelBike = AppDataSource.getRepository(ModelBike);

export { getRepositoryModelBike };
