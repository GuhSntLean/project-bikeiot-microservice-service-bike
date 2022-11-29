import express from "express";
import http from "http";
import { routes } from "../router/routes"

const app = express();
const appPort = process.env.PORT || 3003;

const httpServer = http.createServer(app);

app.set("port", appPort);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);

export { app, httpServer };
