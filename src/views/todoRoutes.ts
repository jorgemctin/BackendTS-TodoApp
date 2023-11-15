import { Router } from "express";

import { getAllTodos, createTodo, updateTodo, deleteTodo } from "../controller/todoController";
import auth from "../middleware/auth";

const router = Router();

router.get("/getAll/:id", auth, getAllTodos);
router.post("/create", auth, createTodo);
router.put("/update/:id", auth, updateTodo);
router.delete("/delete/:id", auth, deleteTodo);

export default router;