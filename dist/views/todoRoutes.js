"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todoController_1 = require("../controller/todoController");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = (0, express_1.Router)();
router.get("/getAll/:id", auth_1.default, todoController_1.getAllMyTodos);
router.post("/create", auth_1.default, todoController_1.createTodo);
router.put("/update/:id", auth_1.default, todoController_1.updateTodo);
router.delete("/delete/:id", auth_1.default, todoController_1.deleteTodo);
exports.default = router;
//# sourceMappingURL=todoRoutes.js.map