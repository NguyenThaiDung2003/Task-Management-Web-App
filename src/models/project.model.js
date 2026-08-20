import { prisma } from '../config/database.js';

export const createProject = async (data) => {
  return await prisma.project.create({
    data: {
      name: data.name,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      ownerId: data.ownerId,
      members: {
        create: { userId: data.ownerId, role: 'OWNER' }
      }
    },
    include: { members: true }
  });
};

export const findProjectById = async (id) => {
  return await prisma.project.findUnique({
    where: { id }
  });
};

export const findProjectsByUserId = async (userId) => {
  return await prisma.project.findMany({
    where: {
      members: { some: { userId } }
    },
    include: {
      owner: { select: { id: true, fullName: true, email: true } },
      members: { include: { user: { select: { id: true, fullName: true, email: true } } } }
    }
  });
};

export const addMember = async (projectId, userId) => {
  return await prisma.projectMember.create({
    data: { projectId, userId, role: 'MEMBER' }
  });
};

export const removeMember = async (projectId, userId) => {
  return await prisma.projectMember.deleteMany({
    where: { projectId, userId }
  });
};