import { validate } from "uuid";
import { AdminUser } from "../models/AdminUser";
import { UserAdminProvider } from "../provider/UserAdminProvider";
import { getRepositoryUserAdmin } from "../repository/UserAdminRepository";
class AdminUserUseCase {
  async execute(adminString: string) {
    const providerUserAdminProvider = new UserAdminProvider();
    const adminData = JSON.parse(adminString);

    if (
      !adminData.id ||
      !adminData.username ||
      !adminData.email ||
      !adminData.role ||
      !providerUserAdminProvider.roleValidation(adminData.role)
    ) {
      return false;
    }

    if (!validate(adminData.id)) {
      return false;
    }

    const userExist = await getRepositoryUserAdmin.findOne({
      where: { id: adminData.id },
    });

    if (!userExist) {
      try {
        const createUserAdmin = getRepositoryUserAdmin.create({
          id: adminData.id,
          userName: adminData.username,
          email: adminData.email,
          role: adminData.role,
        });

        const executeCreateUserAdmin = await getRepositoryUserAdmin.save(
          createUserAdmin
        );

        if (executeCreateUserAdmin) {
          console.log(executeCreateUserAdmin);
        } else {
          console.log({ error: "user not created" });
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      try {
        const result = await getRepositoryUserAdmin
          .createQueryBuilder()
          .update(AdminUser)
          .set({
            userName: adminData.username,
            email: adminData.email,
            role: adminData.role,
          }).where("id = :id", { id: adminData.id })
          .execute();

          console.log(result);
      } catch (error) {
        console.log(error.message);
      }
    }
  }
}

export { AdminUserUseCase };
