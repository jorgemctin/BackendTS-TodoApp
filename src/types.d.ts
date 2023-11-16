import { Request } from 'express';

//DEFINE AuthPayload INTERFACE
export interface AuthPayload {
    user_name?: string;
    email: string;
    password: string;
}

//EXTEND Request INTERFACE TO INCLUDE AuthRequest
export interface AuthRequest extends Request {
    user_id?: number;
    user_name?: string;
    role?: string;
}

//DEFINE UserRole
export interface UserRole {
    user: "user";
    admin: "admin";
}