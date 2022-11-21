import { Request, Response } from "express";

class BikeController {
  async store(request: Request, response: Response) {}

  async update(request: Request, response: Response) {}

  async show(request: Request, response: Response) {}

  async list(request: Request, response: Response) {}

  // Não deletar a bike mas sim desativar de leitura de estado
  async delete(request: Request, response: Response) {}
}

export { BikeController };
