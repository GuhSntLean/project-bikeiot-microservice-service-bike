import { Request, Response } from "express";
import { ModelBikeUseCase } from "../usercase/ModelBikeUseCase";

class ModelBikeController {
  async store(request: Request, response: Response) {
    try {
      const { namemodel } = request.body;

      if (!namemodel) {
        return response.status(400).json({ error: "Field is missing" });
      }

      const modelBike = new ModelBikeUseCase();
      const result = await modelBike.save(namemodel);

      if (result instanceof Error) {
        return response.status(400).json({ error: result.message });
      }

      console.log(result);

      return response.status(201).json(result);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ error: error.message });
    }
  }

  async update(request: Request, response: Response) {
    try {
      const { id, namemodel } = request.body;

      if (!id || !namemodel) {
        return response.status(500).json({ error: "Field is missing" });
      }

      const modelBike = new ModelBikeUseCase();
      const result = await modelBike.update(id, namemodel);

      if (result instanceof Error) {
        return response.status(500).json({ error: result.message });
      }

      return response.status(201).json(result);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ error: error.message });
    }
  }

  async show(request: Request, response: Response) {
    try {
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
    } catch (error) {
      console.log(error);
      return response.status(500).json({ error: error.message });
    }
  }

  async list(request: Request, response: Response) {
    try {
      const modelBike = new ModelBikeUseCase();
      const result = await modelBike.list();

      if (result instanceof Error) {
        return response.status(500).json({ error: result.message });
      }

      return response.status(201).json(result);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ error: error.message });
    }
  }
}

export { ModelBikeController };
