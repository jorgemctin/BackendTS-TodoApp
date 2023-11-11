import { Router } from "express";

import { getAllTodos, createTodo, updateTodo, deleteTodo } from "../controller/todoController";
import auth from "../middleware/auth";

const router = Router();

router.get("/getAll", auth, getAllTodos);
router.post("/create", auth, createTodo);
router.post("/update/:id", auth, updateTodo);
router.post("/delete", auth, deleteTodo);

export default router;