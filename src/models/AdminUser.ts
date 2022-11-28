import { Column, Entity, PrimaryColumn } from "typeorm";

enum UserRole {
  ADMIN = "admin",
  EDITOR = "editor",
}

@Entity("bike_information")
class BikeInformation {
  @PrimaryColumn()
  id: string;

  @Column({ name: "user_name" })
  userName: string;

  @Column({ name: "role", enum: UserRole, default: UserRole.ADMIN })
  updateBy: UserRole;
}

export { BikeInformation, UserRole };
