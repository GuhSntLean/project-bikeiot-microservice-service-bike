import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("bike_information")
class BikeInformation {
  @PrimaryColumn()
  id: string;

  @Column({ name: "create_by" })
  createBy: string;

  @Column({ name: "update_by" })
  updateBy: string;
}

export { BikeInformation };
