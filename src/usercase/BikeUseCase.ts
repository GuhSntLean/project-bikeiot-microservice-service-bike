import { Bike } from "../models/Bike";
import { BikeProvider } from "../provider/BikeProvider";
import { getRepositoryBike } from "../repository/BikeRepository";
import { getRepositoryModelBike } from "../repository/ModelBikeRepository";

class BikeUseCase {
  async save(mac: string, modelbike: string, status: string) {
    const bikeProvider = new BikeProvider();

    const modelBike = await getRepositoryModelBike.findOneBy({ id: modelbike });

    if (!modelBike) {
      return Error("Model bike does not exist in the database");
    }

    const statusBike = bikeProvider.bikeValidation(status);
    if (!statusBike) {
      return Error("Status incorrect or not exist");
    }

    try {
      const newBike = getRepositoryBike.create({
        mac: mac,
        modelBike: modelBike,
        status: statusBike,
      });

      await getRepositoryBike.save(newBike);

      return newBike;
    } catch (error) {
      return new Error("Erro save user");
    }
  }

  async update(id: string, mac: string, status: string, modelbike: string) {
    const bikeProvider = new BikeProvider();

    const bikeExist = await getRepositoryBike.findOneBy({
      id: id,
    });

    if (!bikeExist) {
      return Error("Bike does not exist in the database");
    }

    const modelBike = await getRepositoryModelBike.findOneBy({ id: modelbike });

    if (!modelBike) {
      return Error("Model bike does not exist in the database");
    }

    const statusBike = bikeProvider.bikeValidation(status);
    if (!statusBike) {
      return Error("Status incorrect or not exist");
    }

    try {
      const result = await getRepositoryBike
        .createQueryBuilder()
        .update(Bike)
        .set({
          mac: mac,
          modelBike: modelBike,
          status: statusBike,
        })
        .where("id :id", { id: id })
        .execute();

      if (result.affected != 1) {
        return new Error("Error when updating");
      }

      const bike = await getRepositoryBike.findOneBy({
        id: id,
      });

      return bike;
    } catch (error) {
      return new Error("Error when updating");
    }
  }
  async updateStatus(id: string, status: string) {
    const bikeProvider = new BikeProvider();

    const bikeExist = await getRepositoryBike.findOneBy({
      id: id,
    });

    if (!bikeExist) {
      return Error("Bike does not exist in the database");
    }

    const statusBike = bikeProvider.bikeValidation(status);
    if (!statusBike) {
      return Error("Status incorrect or not exist");
    }

    try {
      const result = await getRepositoryBike
        .createQueryBuilder()
        .update(Bike)
        .set({
          status: statusBike,
        })
        .where("id :id", { id: id })
        .execute();

      if (result.affected != 1) {
        return new Error("Error when updating");
      }

      const bike = await getRepositoryBike.findOneBy({
        id: id,
      });

      return bike;
    } catch (error) {
      return new Error("Error when updating");
    }
  }

  async show(id: string) {
    try {
      const bike = await getRepositoryBike.findOneBy({
        id: id,
      });

      if (!bike) {
        return new Error("User not found");
      }

      return bike;
    } catch (error) {
      console.log(error);
      return new Error("User not found");
    }
  }

  async list() {
    try {
      const list = await getRepositoryBike.find();

      if (!list) {
        return new Error("Bikes not found");
      }
      return list;
    } catch (error) {
      console.log(error);
      return new Error("Informations not found");
    }
  }
}

export { BikeUseCase };
