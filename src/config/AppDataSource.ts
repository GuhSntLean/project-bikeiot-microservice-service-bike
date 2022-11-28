import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  name: "developer",
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "microservice",
  password: "microservice",
  database: "bike-data-base",
  logging: true,
  dropSchema: false,
  synchronize: false,
  migrationsRun: false,
  migrations: ["./src/migrations/*.ts"],
  entities: ["./src/models/*.ts"],
});

export { AppDataSource };
