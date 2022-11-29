import { Request, Response } from "express";
import { BikeUseCase } from "../usercase/BikeUseCase";

class BikeController {
  async store(request: Request, response: Response) {
    const { mac, status, modelbikeid } = request.body;

    if (!mac || !status || !modelbikeid) {
      return response.status(500).json({ error: "Field is missing" });
    }

    const bikeUserCase = new BikeUseCase();
    const result = await bikeUserCase.save(mac, modelbikeid, status);

    if (result instanceof Error) {
      return response.status(500).json({ error: result.message });
    }

    return response.status(201).json(result);
  }

  async update(request: Request, response: Response) {
    const { id, mac, status, modelbikeid } = request.body;

    if (!id || !mac || !status || !modelbikeid) {
      return response.status(500).json({ error: "Field is missing" });
    }

    const bikeUserCase = new BikeUseCase();
    const result = await bikeUserCase.update(id, mac, modelbikeid, status);

    if (result instanceof Error) {
      return response.status(500).json({ error: result.message });
    }

    return response.status(201).json(result);
  }

  async setStatus(request: Request, response: Response) {
    const { id, status } = request.body;

    if (!id || !status) {
      return response.status(500).json({ error: "Field is missing" });
    }

    const bikeUserCase = new BikeUseCase();
    const result = await bikeUserCase.updateStatus(id, status);

    if (result instanceof Error) {
      return response.status(500).json({ error: result.message });
    }

    return response.status(201).json(result);
  }

  async show(request: Request, response: Response) {
    const { id } = request.body;

    if (!id) {
      return response.status(400).json({ error: "Field is missing" });
    }

    const bikeUseCase = new BikeUseCase();
    const result = await bikeUseCase.show(id);

    if (result instanceof Error) {
      return response.status(500).json({ error: result.message });
    }

    return response.status(201).json(result);
  }

  async list(request: Request, response: Response) {
    const bikeUseCase = new BikeUseCase();
    const result = await bikeUseCase.list();

    if (result instanceof Error) {
      return response.status(400).json({ error: result.message });
    }

    return response.status(201).json(result);
  }
}

export { BikeController };
