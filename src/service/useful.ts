import { User } from "../models/User";
import bcrypt from 'bcrypt';
import { Response } from 'express';

// Validations
export const isValidField = async (
    field: string,
    validator: (value: string) => boolean | Promise<boolean>,
    errorMessage: string,
    res?: Response
): Promise<boolean> => {
    const isValid = await validator(field);
    if (!isValid) {
        if (res && !res.headersSent) {
            res.status(400).json({
                success: false,
                message: errorMessage,
            });
        }
        return false;
    }
    return true;
};

//REGISTER
//Email
export const validateEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

//Username
export const isValidUsername = (username: string): boolean =>
    /^[a-zA-Z0-9._-]{1,12}$/.test(username);

//Check email repeat
export const userFoundByEmail = async (email: string): Promise<boolean> =>
    !(await User.findOne({ where: { email } }));

//Check username repeat
export const userFoundByUsername = async (username: string): Promise<boolean> =>
    !(await User.findOne({ where: { username: username } }));

//LOGIN
// Verifica si los datos requeridos están completos
export const checkLoginData = (email: string, password: string, res: Response) => {
    if (!email || !password) {
        res.status(400).json({
            success: false,
            message: "Incomplete login data",
        });
        return false;
    }
    return true;
};

// Check password correctness
export const validatePassword = async (password: string, hash: string, res: Response): Promise<boolean> => {
    const isValid = await bcrypt.compare(password, hash);
    if (!isValid) {
        res.status(401).json({
            success: false,
            message: "Invalid password",
        });
        return false;
    }
    return true;
};

// Check if user exists by email
export const userExistsByEmail = async (email: string): Promise<boolean> =>
    !!(await User.findOne({ where: { email } }));

//TODO
//Todo text
export const isValidTodoText = (text: string): boolean =>
    /^[a-zA-Z0-9._\-?!¡¿]{1,200}$/.test(text);