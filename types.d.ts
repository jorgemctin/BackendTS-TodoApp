export interface UserData {
    id: number;
    userName: string;
    email: string;
    password: string;
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