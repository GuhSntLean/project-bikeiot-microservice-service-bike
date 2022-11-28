import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("model_bike")
class ModelBike {
  @PrimaryColumn()
  id: string;

  @Column({ name: "name_model" })
  nameModel: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { ModelBike };
