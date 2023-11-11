import { Router } from 'express';
import authRoutes from './views/authRoutes';
import todoRoutes from './views/todoRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/todo', todoRoutes);

export default router;