import { Todo } from "./models/Todo";
import { User } from "./models/User";
import { DataSource } from "typeorm";
import { CreateUserTable1699638990563 } from "./migrations/1699638990563-CreateUserTable";
import { CreateTodoTable1699639156136 } from "./migrations/1699639156136-CreateTodoTable";

export const dataBase = new DataSource({
    type: "mysql",
    host: process.env.MYSQL_ADDON_HOST,
    port: parseInt(process.env.PORT as string, 10),
    username: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
    database: process.env.MYSQL_ADDON_DB,
    migrations: [
        CreateUserTable1699638990563,
        CreateTodoTable1699639156136,
    ],
    entities: [User, Todo]
});