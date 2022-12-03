import { ModelBike } from "../models/ModelBike";
import { getRepositoryModelBike } from "../repository/ModelBikeRepository";
import { validate as uuid } from "uuid";

class ModelBikeUseCase {
  async save(namemodel: string) {
    const modelBikeExist = await getRepositoryModelBike.findOne({
      where: {
        nameModel: namemodel,
      },
    });

    if (modelBikeExist) {
      return new Error("model bike exist");
    }

    try {
      const modelBikeCreate = getRepositoryModelBike.create({
        nameModel: namemodel,
      });

      const result = await getRepositoryModelBike.save(modelBikeCreate);

      const returnResult = {
        id: result.id,
        namemodel: result.nameModel,
      };

      return returnResult;
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
    const verifyNameMode = await getRepositoryModelBike.findOneBy({
      nameModel: nameModelBike,
    });

    if(verifyNameMode && verifyNameMode.id != id){
      return new Error("Model bike exist");
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

      const resultUpdate = await getRepositoryModelBike.findOneBy({
        id: id,
      });

      const returnResult = {
        id: resultUpdate.id,
        namemodel: resultUpdate.nameModel,
      };

      return returnResult;
    } catch (error) {
      console.log(error);
      return new Error("Error when updating");
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
