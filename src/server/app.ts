import express from "express";
import http from "http";
import { routes } from "../router/routes";
import { AdminUserUseCase } from "../usercase/AdminUserUseCase";
import { RabbitMQServer } from "./RabbitMQServer";

const app = express();
const appPort = process.env.PORT || 3003;

const httpServer = http.createServer(app);

app.set("port", appPort);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);

const serveramqp = async () => {
  const server = new RabbitMQServer();
  await server.start();
  await server.consume("bike.admin", (message) => {
    const infoUser = message.content.toString();
    const userCase = new AdminUserUseCase();
    userCase.execute(infoUser);
  });
};

serveramqp();

export { app, httpServer };
