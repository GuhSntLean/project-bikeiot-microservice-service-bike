import { Request, Response } from "express";
import { ModelBikeUseCase } from "../usercase/ModelBikeUseCase";

class ModelBikeController {
  async store(request: Request, response: Response) {
    const { namemodel } = request.body;

    if (!namemodel) {
      return response.status(500).json({ error: "Field is missing" });
    }

    const modelBike = new ModelBikeUseCase();
    const result = await modelBike.save(namemodel);

    if (result instanceof Error) {
      return response.status(500).json({ error: result.message });
    }

    console.log(result);

    return response.status(201).json(result);
  }

  async update(request: Request, response: Response) {
    const { id, nameModel } = request.body;

    if (!id || !nameModel) {
      return response.status(500).json({ error: "Field is missing" });
    }

    const modelBike = new ModelBikeUseCase();
    const result = await modelBike.update(id, nameModel);

    if (result instanceof Error) {
      return response.status(500).json({ error: result.message });
    }

    return response.status(201).json(result);
  }

  async show(request: Request, response: Response) {
    const { id } = request.body;

    if (!id) {
      return response.status(500).json({ error: "Field is missing" });
    }

    const modelBike = new ModelBikeUseCase();
    const result = await modelBike.show(id);

    if (result instanceof Error) {
      return response.status(500).json({ error: result.message });
    }

    return response.status(201).json(result);
  }

  async list(request: Request, response: Response) {
    const modelBike = new ModelBikeUseCase();
    const result = await modelBike.list();

    if (result instanceof Error) {
      return response.status(500).json({ error: result.message });
    }

    return response.status(201).json(result);
  }
}

export { ModelBikeController };
