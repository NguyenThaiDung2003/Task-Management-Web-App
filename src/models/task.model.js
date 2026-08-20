import { prisma } from '../config/database.js';

export const createTask = async (data) => {
  return await prisma.task.create({ data });
};

export const findTasksWithFilter = async ({ where, skip, limit, sortBy, sortOrder }) => {
  const [tasks, totalRecords] = await Promise.all([
    prisma.task.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
      include: {
        assignee: { select: { id: true, fullName: true } },
        project: { select: { id: true, name: true } }
      }
    }),
    prisma.task.count({ where })
  ]);

  return { tasks, totalRecords };
};

export const updateStatus = async (id, status) => {
  return await prisma.task.update({
    where: { id },
    data: { status }
  });
};