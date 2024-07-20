import { Request, Response } from 'express';
import { Todo } from '../models/Todo';
import { AuthRequest } from '../types';
import { isValidField, isValidTodoText } from '../service/useful';

//GET ALL MY TODOS
export const getAllMyTodos = async (req: AuthRequest, res: Response) => {
    try {
        const userId = parseInt(req.params.id, 10);

        const todos = await Todo.find({
            where: {
                user_id: userId
            }
        });

        return res.status(200).json({
            success: true,
            todos,
            message: "Here are your Todos",
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            success: false, error
        });
    }
};

//CREATE A NEW TODO
export const createTodo = async (req: Request, res: Response) => {
    try {
        const { text, user_id, completed } = req.body;

        if (!await isValidField(text, isValidTodoText, "The text must contain only letters, numbers, and spaces, and must not exceed 200 characters.", res)) return;

        const newTodo = Todo.create({
            text,
            user_id,
            completed: completed || false,
        });

        await newTodo.save();

        return res.status(201).json({
            success: true,
            todo: newTodo
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            success: false, error
        });
    }
};

//UPDATE A TODO
export const updateTodo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { text, user_id, completed } = req.body;

        const todoId: number = parseInt(id, 10);

        let todo = await Todo.findOneOrFail({
            where: { id: todoId },
            relations: ['user']
        });

        if (text) {
            if (!await isValidField(text, isValidTodoText, "The text must contain only letters, numbers, and spaces, and must not exceed 200 characters.", res)) return;
        }
        
        todo.text = text ?? todo.text;
        todo.user_id = user_id ?? todo.user_id;
        todo.completed = completed ?? todo.completed;

        await todo.save();

        return res.status(200).json({
            success: true, todo
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            success: false, error,
        });
    }
};

//DELETE A TODO
export const deleteTodo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const todoId: number = parseInt(id, 10);

        const todo = await Todo.findOneOrFail({
            where: { id: todoId },
            relations: ['user'],
        });

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found'
            });
        }

        await todo.remove();

        return res.status(200).json({
            success: true,
            message: 'Todo deleted successfully'
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            success: false, error
        });
    }
};

