import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class AdminUser1669661016407 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "admin_users",
              columns: [
                {
                  name: "id",
                  type: "uuid",
                  isPrimary: true,
                },
                {
                  name: "user_name",
                  type: "varchar",
                  isUnique: false,
                },
                {
                  name: "email",
                  type: "varchar",
                  isUnique: false,
                },
                {
                  name: "role",
                  type: "varchar",
                },
              ],
            })
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable("admin_users");
    }
}
