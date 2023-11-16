import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';

const isAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
    try {
        if (req.role !== "admin") {
            res.json({
                success: true,
                message: "You need Admin permissions"
            });
            return; 
        } 
        
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "You need Admin permissions",
            error: error
        });  
    }
}

export default isAdmin;