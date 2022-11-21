import { AppDataSource } from "../config/AppDataSource";
import { BikeInformation } from "../models/BikeInformation";

class BikeInformationRepository {
    getRepositoryBikeInformation = AppDataSource.getRepository(BikeInformation);
}

export { BikeInformationRepository };
