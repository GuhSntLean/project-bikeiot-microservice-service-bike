import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ModelBike1669661043975 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "model_bike",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name_model",
            type: "varchar",
            isUnique: true,
          }
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable("model_bike");
  }
}
