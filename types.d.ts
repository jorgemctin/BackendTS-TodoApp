export interface UserData {
    id: number;
    name: string;
    email: string;
    password: string;
    userName: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload extends LoginPayload {
    userName: string;
}