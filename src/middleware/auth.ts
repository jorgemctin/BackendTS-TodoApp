import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
    user_id?: number;
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

        // Aquí puedes acceder a las propiedades específicas de UserData
        req.user_id = decoded.id;
        req.userName = decoded.userName;

        console.log("req.user_id:", req.user_id);

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