import { Request, Response } from 'express';
import { Todo } from '../models/Todo';
import { AuthRequest } from '../middleware/auth';

export const getAllTodos = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId;

        const todos = await Todo.find({ where: { userId } });

        return res.status(200).json({
            success: true,
            todos,
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            success: false,
            error,
        });
    }
};

export const createTodo = async (req: Request, res: Response) => {
    try {
        const { text, userId, completed } = req.body;

        const newTodo = Todo.create({
            text,
            userId,
            completed: completed || false,
        });

        await newTodo.save();

        return res.status(201).json({ success: true, todo: newTodo });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ success: false, error });
    }
};

export const updateTodo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { text, userId, completed } = req.body;

        const todoId: number = parseInt(id, 10);

        let todo = await Todo.findOneOrFail({
            where: { id: todoId },
            relations: ['user']
        });

        todo.text = text || todo.text;
        todo.userId = userId !== undefined ? userId : todo.userId;
        todo.completed = completed !== undefined ? completed : todo.completed; // Actualiza el campo complete si está presente en la solicitud

        await todo.save();

        return res.status(200).json({ success: true, todo });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ success: false, error });
    }
};

export const deleteTodo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const todoId: number = parseInt(id, 10);

        const todo = await Todo.findOneOrFail({
            where: { id: todoId },
            relations: ['user'],
        });

        if (!todo) {
            return res.status(404).json({ success: false, message: 'Todo not found' });
        }

        await todo.remove();

        return res.status(200).json({ success: true, message: 'Todo deleted successfully' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ success: false, error });
    }
};
