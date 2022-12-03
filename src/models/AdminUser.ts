import { Column, Entity, PrimaryColumn } from "typeorm";

enum UserRole {
  ADMIN = "admin",
  EDITOR = "editor",
}

@Entity("admin_users")
class AdminUser {
  @PrimaryColumn()
  id: string;

  @Column({ name: "user_name" })
  userName: string;

  @Column({ name: "email" })
  email: string;

  @Column({ name: "role", enum: UserRole, default: UserRole.ADMIN })
  role: UserRole;
}

export { AdminUser, UserRole };
