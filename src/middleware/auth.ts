import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
    userId?: number;
    userName?: string;
}
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

        req.userId = decoded.id;
        req.userName = decoded.userName;

        console.log("req.userId:", req.userId);

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