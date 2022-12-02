import { ModelBike } from "../models/ModelBike";
import { getRepositoryModelBike } from "../repository/ModelBikeRepository";
import { validate as uuid } from "uuid";

class ModelBikeUseCase {
  async save(namemodel: string) {
    try {
      const modelBikeCreate = getRepositoryModelBike.create({
        nameModel: namemodel,
      });

      const result = await getRepositoryModelBike.save(modelBikeCreate);

      const modelBike = await getRepositoryModelBike.findOneBy({
        id: result.id,
      });

      return modelBike;
    } catch (error) {
      console.log(error);
      return new Error("Error when save");
    }
  }

  async update(id: string, nameModelBike: string) {
    if (!uuid(id)) {
      return Error("Bike does not exist in the database");
    }

    const modelbike = await getRepositoryModelBike.findOneBy({
      id: id,
    });

    if (!modelbike) {
      return new Error("Model Bike not found");
    }

    try {
      const result = await getRepositoryModelBike
        .createQueryBuilder()
        .update(ModelBike)
        .set({
          nameModel: nameModelBike,
        })
        .where("id = :id", { id: id })
        .execute();

      if (result.affected != 1) {
        return new Error("Error when updating");
      }

      const modelBike = await getRepositoryModelBike.findOneBy({
        id: id,
      });

      return modelBike;
    } catch (error) {
      console.log(error);
      return new Error("Model bikes not found");
    }
  }

  async show(id: string) {
    if (!uuid(id)) {
      return Error("Bike does not exist in the database");
    }

    try {
      const modelBike = await getRepositoryModelBike.findOneBy({
        id: id,
      });

      if (!modelBike) {
        return new Error("Model Bike not found");
      }

      return modelBike;
    } catch (error) {
      console.log(error);
      return new Error("Model bikes not found");
    }
  }

  async list() {
    try {
      const list = await getRepositoryModelBike.find();

      if (!list) {
        return new Error("Model Bike not found");
      }

      return list;
    } catch (error) {
      console.log(error);
      return new Error("Models bikes not found");
    }
  }
}

export { ModelBikeUseCase };
