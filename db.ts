import { DataSource } from "typeorm";
require("dotenv").config();

const { MYSQL_HOST, MYSQL_PORT, MYSQL_USERNAME, MYSQL_PASSWORD } = process.env;

export const dataBase = new DataSource({
    type: "mysql",
    database: "todoApp",
    host: MYSQL_HOST,
    port: +(MYSQL_PORT as string),
    username: MYSQL_USERNAME,
    password: MYSQL_PASSWORD,
    //   entities: [User, Appointment],
});