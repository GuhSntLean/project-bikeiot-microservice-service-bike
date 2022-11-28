import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Bike1669661059766 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "bike",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "mac",
            type: "varchar",
          },
          {
            name: "status",
            type: "varchar",
          },
          {
            name: "serial_Number",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "model_id",
            type: "uuid",
          },
        ],
        foreignKeys: [
          {
            name: "ModelBike",
            referencedTableName: "model_bike",
            referencedColumnNames: ["id"],
            columnNames: ["model_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable("admin_users");
  }
}
