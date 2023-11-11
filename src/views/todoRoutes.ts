import { Router } from "express";

import { getAllTodos, createTodo, updateTodo, deleteTodo } from "../controller/todoController";
import auth from "../middleware/auth";

const router = Router();

router.get("/getAll/:id",  getAllTodos);
router.post("/create", createTodo);
router.put("/update/:id", updateTodo);
router.delete("/delete/:id",  deleteTodo);

export default router;