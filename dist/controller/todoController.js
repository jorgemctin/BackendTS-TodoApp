"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getAllMyTodos = void 0;
const Todo_1 = require("../models/Todo");
const useful_1 = require("../service/useful");
//GET ALL MY TODOS
const getAllMyTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.id, 10);
        const todos = yield Todo_1.Todo.find({
            where: {
                user_id: userId
            }
        });
        return res.status(200).json({
            success: true,
            todos,
            message: "Here are your Todos",
        });
    }
    catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            success: false, error,
            message: error
        });
    }
});
exports.getAllMyTodos = getAllMyTodos;
//CREATE A NEW TODO
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { text, user_id, completed } = req.body;
        if (!(yield (0, useful_1.isValidField)(text, useful_1.isValidTodoText, "The text can include letters, numbers, spaces, and . _ - ? ! ¡ ¿, up to 200 characters.", res)))
            return;
        const newTodo = Todo_1.Todo.create({
            text,
            user_id,
            completed: completed || false,
        });
        yield newTodo.save();
        return res.status(201).json({
            success: true,
            todo: newTodo
        });
    }
    catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            success: false, error
        });
    }
});
exports.createTodo = createTodo;
//UPDATE A TODO
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { text, user_id, completed } = req.body;
        const todoId = parseInt(id, 10);
        let todo = yield Todo_1.Todo.findOneOrFail({
            where: { id: todoId },
            relations: ['user']
        });
        if (text) {
            if (!(yield (0, useful_1.isValidField)(text, useful_1.isValidTodoText, "The text can include letters, numbers, spaces, and . _ - ? ! ¡ ¿, up to 200 characters.", res)))
                return;
        }
        todo.text = text !== null && text !== void 0 ? text : todo.text;
        todo.user_id = user_id !== null && user_id !== void 0 ? user_id : todo.user_id;
        todo.completed = completed !== null && completed !== void 0 ? completed : todo.completed;
        yield todo.save();
        return res.status(200).json({
            success: true, todo
        });
    }
    catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            success: false, error,
        });
    }
});
exports.updateTodo = updateTodo;
//DELETE A TODO
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const todoId = parseInt(id, 10);
        const todo = yield Todo_1.Todo.findOneOrFail({
            where: { id: todoId },
            relations: ['user'],
        });
        if (!todo) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found'
            });
        }
        yield todo.remove();
        return res.status(200).json({
            success: true,
            message: 'Todo deleted successfully'
        });
    }
    catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            success: false, error
        });
    }
});
exports.deleteTodo = deleteTodo;
//# sourceMappingURL=todoController.js.map