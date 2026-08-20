import { Router } from 'express';
import * as taskController from '../controllers/task.controller.js';

const router = Router();

// Định nghĩa cả 2 route trên cùng một endpoint '/'
router.route('/')
  .get(taskController.getTasks)     // GET  /api/v1/tasks
  .post(taskController.createTask); // POST /api/v1/tasks

export default router;