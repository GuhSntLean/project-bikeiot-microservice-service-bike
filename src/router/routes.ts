import express from "express";
import { BikeController } from "../controllers/BikeController";
import { ModelBikeController } from "../controllers/ModelBikeController";

const modelBikeController = new ModelBikeController();
const bikeController = new BikeController();

const routes = express();

routes.get("/list-model-bike", modelBikeController.list);
routes.get("/model-bike", modelBikeController.show);
routes.put("/model-bike", modelBikeController.update);
routes.post("/model-bike", modelBikeController.store);

routes.get("/list-bike", bikeController.list);
routes.get("/bike", bikeController.show);
routes.put("/bike", bikeController.update);
routes.post("/bike", bikeController.store);
routes.post("/set-status-bike", bikeController.setStatus);

export { routes };
