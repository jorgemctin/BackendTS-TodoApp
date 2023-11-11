import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { Request, Response } from "express";
import { RegisterPayload, LoginPayload } from "../../types";
import { FindOneOptions } from 'typeorm';

const JWT_SECRET = process.env.JWT_SECRET || "";

export const register = async (req: Request, res: Response) => {
    
    try {
        const {  email, password } = req.body as RegisterPayload;

        const userFound = await User.findOne({ where: { email } } as FindOneOptions<User>);

        if (userFound) {
            return res.status(200).json({
                success: true,
                message: "A user is already registered with that email address."
            });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const userRegistered = await User.create({
            ...req.body,
            password: encryptedPassword,
        }).save();

        const token = jwt.sign({ userId: userRegistered.id }, JWT_SECRET, {
            expiresIn: "3h",
        });

        return res.status(200).json({
            success: true,
            message: "User registered successfully",
            userRegistered: {
                userName: userRegistered.userName,
                email: userRegistered.email,
            },
            token,
        });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            success: false,
            error
        });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body as LoginPayload;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Incomplete login data",
            });
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid login credentials",
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid login credentials",
            });
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
            expiresIn: "3h",
        });

        return res.status(200).json({
            success: true,
            data: { user, token },
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            success: false,
            error,
        });
    }
};