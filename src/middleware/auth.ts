import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types';

//VERIFY USER
const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const bearerToken = req.headers.authorization;

        if (!bearerToken) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Token not provided",
            });
        }

        const token = bearerToken.split(" ")[1];

        const decoded: any = jwt.verify(token, 'secreto');

        req.user_id = decoded.id;
        req.user_name = decoded.user_name;
        req.role = decoded.role;
        
        next();
    } catch (error: any) {
        return res.status(500).json(
            {
                success: false,
                message: "Token Invalid",
                error: error.message
            }
        );
    }
};

export default auth;