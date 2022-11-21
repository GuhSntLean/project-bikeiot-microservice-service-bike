import express from "express";

const routes = express();

routes.get("/manager-bike");
routes.get("/manager-bike/:id");

routes.post("/manager-bike");
routes.put("/manager-bike");

routes.put("/status-bike/:id");
routes.get("/status-bike/:id");

export { routes };
