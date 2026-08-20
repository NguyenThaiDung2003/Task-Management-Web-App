import { Router } from 'express';
import * as taskController from '../controllers/task.controller.js';

const router = Router();

// Định nghĩa cả 2 route trên cùng một endpoint '/'
router.get('/', taskController.getTasks)     // GET  /api/v1/tasks
router.post('/', taskController.createTask)  // POST /api/v1/tasks
router.patch('/:taskId/status', taskController.updateStatus); // PATCH /api/v1/tasks/:taskId/status

export default router;