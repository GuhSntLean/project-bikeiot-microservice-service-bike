import { UserRole } from "../models/AdminUser";

class UserAdminProvider {
  roleValidation(role: string) {
    switch (role) {
      case "admin":
        return UserRole.ADMIN;
      case "editor":
        return UserRole.EDITOR;
      default:
        return false;
    }
  }
}

export { UserAdminProvider };
