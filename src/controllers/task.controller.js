import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/response.js';
import * as taskService from '../services/task.service.js';

// GET: Lấy danh sách công việc
export const getTasks = asyncHandler(async (req, res) => {
  const { tasks, pagination } = await taskService.getTasks(req.query);
  return sendSuccess(res, 200, 'Lấy danh sách công việc thành công', tasks, pagination);
});

// POST: Tạo công việc mới
export const createTask = asyncHandler(async (req, res) => {
  const currentUserId = req.user.id;
  const newTask = await taskService.createTask(currentUserId, req.body);
  return sendSuccess(res, 201, 'Tạo công việc mới thành công', newTask);
});
export const updateStatus = asyncHandler(async (req, res) => {
    const { taskId } = req.params;
    const { status } = req.body;
    const updatedTask = await taskService.updateTaskStatus(taskId, status);
    return sendSuccess(res, 200, 'Cập nhật trạng thái công việc thành công', updatedTask);
});
