import { AppDataSource } from "../config/AppDataSource";
import { AdminUser } from "../models/AdminUser";

const getRepositoryUserAdmin = AppDataSource.getRepository(AdminUser);

export { getRepositoryUserAdmin };
