import { Router } from 'express';
import taskRoutes from './task.route.js';


const router = Router();
router.use('/tasks', taskRoutes); // Các đường dẫn quản lý công việc: /api/v1/tasks

export default router;