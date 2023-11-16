import { Router } from "express";
import { getAllMyTodos, createTodo, updateTodo, deleteTodo } from "../controller/todoController";
import auth from "../middleware/auth";

const router = Router();

router.get("/getAll/:id", auth, getAllMyTodos);
router.post("/create", auth, createTodo);
router.put("/update/:id", auth, updateTodo);
router.delete("/delete/:id", auth, deleteTodo);

export default router;