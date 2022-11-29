import { Request, Response } from "express";
import { ModelBikeUseCase } from "../usercase/ModelBikeUseCase";

class ModelBikeController {
  async store(request: Request, response: Response) {
    const { nameModel } = request.body;

    if (!nameModel) {
      return response.status(500).json({ error: "Field is missing" });
    }

    const modelBike = new ModelBikeUseCase();
    const result = modelBike.save();

    if (result instanceof Error) {
      return response.status(500).json({ error: result.message });
    }

    return response.status(201).json(result);
  }

  async update(request: Request, response: Response) {
    const { nameModel } = request.body;

    if (!nameModel) {
      return response.status(500).json({ error: "Field is missing" });
    }

    const modelBike = new ModelBikeUseCase();
    const result = modelBike.update();

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
    const result = modelBike.show();

    if (result instanceof Error) {
      return response.status(500).json({ error: result.message });
    }

    return response.status(201).json(result);
  }

  async list(request: Request, response: Response) {
    const modelBike = new ModelBikeUseCase();
    const result = modelBike.list();

    if (result instanceof Error) {
      return response.status(500).json({ error: result.message });
    }

    return response.status(201).json(result);
  }
}

export { ModelBikeController };
