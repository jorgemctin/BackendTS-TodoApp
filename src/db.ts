import { Todo } from "./models/Todo";
import { User } from "./models/User";
import { DataSource } from "typeorm";
import { CreateUserTable1699638990563 } from "./migrations/1699638990563-CreateUserTable";
import { CreateTodoTable1699639156136 } from "./migrations/1699639156136-CreateTodoTable";

require("dotenv").config();

const { MYSQL_HOST, MYSQL_PORT, MYSQL_USERNAME, MYSQL_PASSWORD } = process.env;

export const dataBase = new DataSource({
    type: "mysql",
    database: "todoApp",
    host: MYSQL_HOST,
    port: + (MYSQL_PORT as string),
    username: MYSQL_USERNAME,
    password: MYSQL_PASSWORD,
    migrations: [
        CreateUserTable1699638990563,
        CreateTodoTable1699639156136,
    ],
    entities: [User, Todo]
});