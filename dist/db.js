"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataBase = void 0;
const Todo_1 = require("./models/Todo");
const User_1 = require("./models/User");
const typeorm_1 = require("typeorm");
const _1699638990563_CreateUserTable_1 = require("./migrations/1699638990563-CreateUserTable");
const _1699639156136_CreateTodoTable_1 = require("./migrations/1699639156136-CreateTodoTable");
exports.dataBase = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.MYSQL_ADDON_HOST,
    port: parseInt(process.env.PORT, 10),
    username: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
    database: process.env.MYSQL_ADDON_DB,
    migrations: [
        _1699638990563_CreateUserTable_1.CreateUserTable1699638990563,
        _1699639156136_CreateTodoTable_1.CreateTodoTable1699639156136,
    ],
    entities: [User_1.User, Todo_1.Todo]
});
//# sourceMappingURL=db.js.map