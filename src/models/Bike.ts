import { Column, Entity, PrimaryColumn } from "typeorm";
import { BikeInformation } from "./BikeInformation";

@Entity("bike")
class Bike {
  @PrimaryColumn()
  id: number;

  @Column({ name: "mac", type: "string" })
  mac: string;

  @Column({ name: "status", type: "boolean" })
  status: boolean;

  @Column({ name: "secret_bike", type: "string" })
  secretBike: string;

  informationBike: BikeInformation;
}

export { Bike };
