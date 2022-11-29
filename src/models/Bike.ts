import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { ModelBike } from "./ModelBike";

enum StatuBike {
  DISABLE = "disable",
  ACTIVE = "active",
  UPKEEP = "upkeep",
}

@Entity("bike")
class Bike {
  @PrimaryColumn()
  id: string;

  @Column({ name: "mac", type: "text" })
  mac: string;

  @Column({ name: "status", enum: StatuBike, default: StatuBike.ACTIVE })
  status: StatuBike;

  @Column({ name: "serial_Number", unique: true})
  serialNumber: string;

  @ManyToOne(() => ModelBike, (model) => model.id)
  @JoinColumn({ name: "model_id" })
  modelBike: ModelBike;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
    if (!this.serialNumber) {
      this.serialNumber = uuid();
    }
  }
}

export { Bike, StatuBike };
