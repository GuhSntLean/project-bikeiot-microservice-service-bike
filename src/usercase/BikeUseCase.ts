import { InterfaceResponseBike } from "../Interfaces/InterfaceBike";
import { Bike } from "../models/Bike";
import { BikeProvider } from "../provider/BikeProvider";
import { getRepositoryBike } from "../repository/BikeRepository";
import { getRepositoryModelBike } from "../repository/ModelBikeRepository";
import { RabbitMQServer } from "../server/RabbitMQServer";
import { validate as uuid } from "uuid";

class BikeUseCase {
  async save(mac: string, modelbike: string, status: string) {
    const serverAmqp = new RabbitMQServer();

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

      const resultCreate = await getRepositoryBike.save(newBike);

      const resultReturn: InterfaceResponseBike = {
        id: resultCreate.id,
        serialnumber: resultCreate.serialNumber,
        mac: resultCreate.mac,
        status: resultCreate.status,
        modelbike: resultCreate.modelBike.id,
      };

      await serverAmqp.start();
      await serverAmqp.publishExchange(
        "data.bike",
        JSON.stringify(resultCreate)
      );

      return resultReturn;
    } catch (error) {
      return new Error("Erro save bike");
    }
  }

  async update(id: string, mac: string, status: string, modelbike: string) {
    const serverAmqp = new RabbitMQServer();
    const bikeProvider = new BikeProvider();

    if (!uuid(id)) {
      return Error("Bike does not exist in the database");
    }

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
        .where("id = :id", { id: id })
        .execute();

      if (result.affected != 1) {
        return new Error("Error when updating");
      }

      const resultUpdate = await getRepositoryBike.findOne({
        where: {
          id: id,
        },
        relations: {
          modelBike: true,
        },
      });

      const resultReturn: InterfaceResponseBike = {
        id: resultUpdate.id,
        serialnumber: resultUpdate.serialNumber,
        mac: resultUpdate.mac,
        status: resultUpdate.status,
        modelbike: resultUpdate.modelBike.id,
      };

      await serverAmqp.start();
      await serverAmqp.publishExchange(
        "data.bike",
        JSON.stringify(resultUpdate)
      );

      return resultReturn;
    } catch (error) {
      return new Error("Error when updating");
    }
  }
  async updateStatus(id: string, status: string) {
    const serverAmqp = new RabbitMQServer();
    const bikeProvider = new BikeProvider();

    if (!uuid(id)) {
      return Error("Bike does not exist in the database");
    }

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
        .where("id = :id", { id: id })
        .execute();

      if (result.affected != 1) {
        return new Error("Error when updating");
      }

      const bike = await getRepositoryBike.findOne({
        where: {
          id: id,
        },
        relations: {
          modelBike: true,
        },
      });
      const resultReturn: InterfaceResponseBike = {
        id: bike.id,
        serialnumber: bike.serialNumber,
        mac: bike.mac,
        status: bike.status,
        modelbike: bike.modelBike.id,
      };

      await serverAmqp.start();
      await serverAmqp.publishExchange(
        "data.bike",
        JSON.stringify(resultReturn)
      );

      const status = {
        id: bike.id,
        status: bike.status,
      };

      return status;
    } catch (error) {
      return new Error("Error when updating");
    }
  }

  async show(id: string) {
    if (!uuid(id)) {
      return Error("Bike does not exist in the database");
    }

    try {
      const bike = await getRepositoryBike.findOne({
        where: { id: id },
        relations: { modelBike: true },
      });

      if (!bike) {
        return new Error("Bike does not exist in the database");
      }

      const resultReturn: InterfaceResponseBike = {
        id: bike.id,
        serialnumber: bike.serialNumber,
        mac: bike.mac,
        status: bike.status,
        modelbike: bike.modelBike.id,
      };

      return resultReturn;
    } catch (error) {
      console.log(error);
      return new Error("Bike does not exist in the database");
    }
  }

  async list() {
    try {
      const list = await getRepositoryBike
        .createQueryBuilder("bike")
        .select(
          "bike.id , bike.mac , bike.serial_Number as serialnumber, bike.model_id as modelbike"
        )
        .getRawMany();

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
