import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTodoTable1699639156136 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "todos",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "text",
                    type: "varchar",
                },
                {
                    name: "userId",
                    type: "int",
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
                },
            ],
        }), true);

        // FEAT FOREING KEY TO "userId".
        await queryRunner.createForeignKey("todos", new TableForeignKey({
            columnNames: ["userId"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("todos");
    }
}