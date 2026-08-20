import * as projectModel from '../models/project.model.js';

export const createProject = async (userId, data) => {
  const projectData = {
    ...data,
    ownerId: userId,
    startDate: data.startDate ? new Date(data.startDate) : null,
    endDate: data.endDate ? new Date(data.endDate) : null
  };
  return await projectModel.createProject(projectData);
};

export const getProjects = async (userId) => {
  return await projectModel.findProjectsByUserId(userId);
};

export const addMember = async (ownerId, projectId, targetUserId) => {
  const project = await projectModel.findProjectById(projectId);
  if (!project) throw { statusCode: 404, message: 'Dự án không tồn tại' };
  if (project.ownerId !== ownerId) throw { statusCode: 403, message: 'Chỉ chủ dự án mới có quyền thêm thành viên' };

  return await projectModel.addMember(projectId, targetUserId);
};