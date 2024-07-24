"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const router_1 = __importDefault(require("./router"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(router_1.default);
db_1.dataBase.initialize()
    .then(() => {
    const PORT = parseInt(process.env.PORT, 10) || 3000;
    app.listen(PORT, () => {
        console.log(`App listening on port:${PORT}`);
        console.log(`Swagger available on: ${process.env.BASE_URL}`);
    });
})
    .catch(error => {
    console.error('Failed to initialize database:', error);
});
//# sourceMappingURL=index.js.map