import * as taskModel from '../models/task.model.js';
import * as projectModel from '../models/project.model.js';

export const createTask = async (userId, data) => {
  const project = await projectModel.findProjectById(data.projectId);
  if (!project) throw { statusCode: 404, message: 'Dự án không tồn tại' };
  if (project.ownerId !== userId) throw { statusCode: 403, message: 'Chỉ chủ dự án mới được tạo và giao công việc' };

  const taskData = {
    title: data.title,
    description: data.description,
    status: data.status || 'todo',
    priority: data.priority || 'medium',
    dueDate: data.dueDate ? new Date(data.dueDate) : null,
    projectId: data.projectId,
    assigneeId: data.assigneeId
  };

  return await taskModel.createTask(taskData);
};

export const getTasks = async (query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const skip = (page - 1) * limit;

  const where = {};
  if (query.projectId) where.projectId = parseInt(query.projectId);
  if (query.status) where.status = query.status;
  if (query.priority) where.priority = query.priority;
  if (query.assigneeId) where.assigneeId = parseInt(query.assigneeId);
  if (query.search) where.title = { contains: query.search };

  const { tasks, totalRecords } = await taskModel.findTasksWithFilter({
    where,
    skip,
    limit,
    sortBy: query.sortBy || 'createdAt',
    sortOrder: query.sortOrder || 'desc'
  });

  return {
    tasks,
    pagination: {
      page,
      limit,
      totalRecords,
      totalPages: Math.ceil(totalRecords / limit)
    }
  };
};

export const updateTaskStatus = async (taskId, status) => {
  return await taskModel.updateStatus(taskId, status);
};