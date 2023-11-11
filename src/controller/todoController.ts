import { Request, Response } from 'express';
import { Todo } from '../models/Todo';

export const getAllTodos = async (req: Request, res: Response) => {
    try {
        const todos = await Todo.find({ relations: ['user'] });
        return res.status(200).json({ success: true, todos });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ success: false, error });
    }
};

export const createTodo = async (req: Request, res: Response) => {
    try {
        const { text, user_id } = req.body;

        const newTodo = Todo.create({
            text,
            user_id,
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
        const { text, user_id } = req.body;

        const todoId: number = parseInt(id, 10);

        let todo = await Todo.findOneOrFail({
            where: { id: todoId },
            relations: ['user'],
        });

        todo.text = text || todo.text;
        todo.user_id = user_id !== undefined ? user_id : todo.user_id;

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

        // Convertir el id a un número
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
