import express from "express";
import { BikeController } from "../controllers/BikeController";
import { ModelBikeController } from "../controllers/ModelBikeController";
import AuthenticatedAdminMiddleware from "../middleware/AuthenticatedAdminMiddleware";

const authenticatedAdminMiddleware = new AuthenticatedAdminMiddleware();

const modelBikeController = new ModelBikeController();
const bikeController = new BikeController();

const routes = express();

routes.get(
  "/list-model-bike",
  authenticatedAdminMiddleware.ensureAuthenticated,
  modelBikeController.list
);
routes.get(
  "/model-bike",
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

routes.get(
  "/list-bike",
  authenticatedAdminMiddleware.ensureAuthenticated,
  bikeController.list
);
routes.get(
  "/bike",
  authenticatedAdminMiddleware.ensureAuthenticated,
  bikeController.show
);
// routes.put(
//   "/bike",
//   authenticatedAdminMiddleware.ensureAuthenticated,
//   bikeController.update
// );
routes.put(
  "/bike",
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
