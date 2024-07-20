import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { Request, Response } from "express";
import { AuthPayloadLogin, AuthPayloadRegister, } from "../types";
import {
    checkLoginData,
    // isPasswordCorrect,
    // isPasswordCorrectValidator,
    isValidField,
    isValidUsername,
    userExistsByEmail,
    userFoundByEmail,
    userFoundByUsername,
    validateEmail,
    validatePassword,
    // validateEmailAndPassword
} from "../service/useful";

const JWT_SECRET = process.env.JWT_SECRET || "";

// REGISTER 
export const register = async (req: Request, res: Response) => {

    try {
        const { email, password, username } = req.body as AuthPayloadRegister;

        // Validations
        if (!await isValidField(email, validateEmail, "Invalid email format", res)) return;
        if (!await isValidField(username, isValidUsername, "Username must be a maximum of 12 characters", res)) return;
        if (!await isValidField(password, (pw) => pw.length >= 6, "Password must be longer than 6 characters", res)) return;
        if (!await isValidField(email, userFoundByEmail, "A user is already registered with that email address.", res)) return;
        if (!await isValidField(username, userFoundByUsername, "The username is already in use.", res)) return;

        const encryptedPassword = await bcrypt.hash(password, 10);

        const userRegistered = await User.create({
            ...req.body,
            role: "user",
            password: encryptedPassword,
        }).save();

        const token = jwt.sign({
            userId: userRegistered.id
        }, JWT_SECRET, {
            expiresIn: "3h",
        });

        return res.status(200).json({
            success: true,
            message: "User registered successfully",
            userRegistered: {
                username: userRegistered.username,
                email: userRegistered.email,
                userId: userRegistered.id,
                role: userRegistered.role,
            },
            token,
        });

    } catch (error: any) {
        console.error("Error:", error.message);
        return res.status(500).json({
            success: false,
            message: "User cant be created",
            error: error.message,
        });
    }
};

//LOGIN
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body as AuthPayloadLogin;

        //Validations
        if (!checkLoginData(email, password, res)) return; 
        await isValidField(email, userExistsByEmail, "Invalid login credentials");
        const user = await User.findOne({ where: { email } });
        if (!user || !(await validatePassword(password, user.password, res))) return;
        
        const token = jwt.sign({
            userId: user.id
        },
            JWT_SECRET, {
            expiresIn: "3h",
        });
        return res.status(200).json({
            success: true,
            message: "User logged succesfully",
            data: { user, token },
        });
    } catch (error: any) {
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
            message: "users cant be logged",
            error: error.message,
        });
    }
};