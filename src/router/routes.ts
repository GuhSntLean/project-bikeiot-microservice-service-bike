import express from "express";
import { BikeController } from "../controllers/BikeController";
import { ModelBikeController } from "../controllers/ModelBikeController";
import AuthenticatedAdminMiddleware from "../middleware/AuthenticatedAdminMiddleware";

const authenticatedAdminMiddleware = new AuthenticatedAdminMiddleware();

const modelBikeController = new ModelBikeController();
const bikeController = new BikeController();

const routes = express();

routes.post(
  "/list-model-bike",
  authenticatedAdminMiddleware.ensureAuthenticated,
  modelBikeController.list
);
routes.post(
  "/get-model-bike",
  authenticatedAdminMiddleware.ensureAuthenticated,
  modelBikeController.show
);
routes.put(
  "/model-bike",
  authenticatedAdminMiddleware.ensureAuthenticated,
  modelBikeController.update
);
routes.post(
  "/model-bike",
  authenticatedAdminMiddleware.ensureAuthenticated,
  modelBikeController.store
);

routes.post(
  "/list-bike",
  authenticatedAdminMiddleware.ensureAuthenticated,
  bikeController.list
);
routes.post(
  "/get-bike",
  authenticatedAdminMiddleware.ensureAuthenticated,
  bikeController.show
);
routes.put(
  "/bike",
  authenticatedAdminMiddleware.ensureAuthenticated,
  bikeController.update
);
routes.post(
  "/bike",
  authenticatedAdminMiddleware.ensureAuthenticated,
  bikeController.store
);
routes.post(
  "/set-status-bike",
  authenticatedAdminMiddleware.ensureAuthenticated,
  bikeController.setStatus
);

export { routes };
