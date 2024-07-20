import { Request } from 'express';

//DEFINE AuthPayloadRegister INTERFACE
export interface AuthPayloadRegister {
    username: string;
    email: string;
    password: string;
}

//DEFINE AuthPayloadLogin INTERFACE
export interface AuthPayloadLogin {
    email: string;
    password: string;
}

//EXTEND Request INTERFACE TO INCLUDE AuthRequest
export interface AuthRequest extends Request {
    user_id?: number;
    username?: string;
    role?: string;
}

//DEFINE UserRole
export interface UserRole {
    user: "user";
    admin: "admin";
}

export interface CustomError extends Error {
    status?: number;
}
