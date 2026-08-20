
import bcrypt from 'bcryptjs';

import {prisma} from '../src/config/database.js';
async function main() {
  console.log('🌱 Đang làm sạch database...');
  // Xóa dữ liệu cũ theo thứ tự để tránh lỗi khóa ngoại (Foreign Key)
  await prisma.task.deleteMany();
  await prisma.projectMember.deleteMany();
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();

  console.log('👤 Đang tạo Users...');
  const hashedPassword = await bcrypt.hash('123456', 10);

  const admin = await prisma.user.create({
    data: {
      fullName: 'Nguyen Van Admin',
      email: 'admin@gmail.com',
      password: hashedPassword
    }
  });

  const member1 = await prisma.user.create({
    data: {
      fullName: 'Tran Van Dev',
      email: 'dev@gmail.com',
      password: hashedPassword
    }
  });

  const member2 = await prisma.user.create({
    data: {
      fullName: 'Le Thi Tester',
      email: 'tester@gmail.com',
      password: hashedPassword
    }
  });

  console.log('📁 Đang tạo Projects...');
  const project1 = await prisma.project.create({
    data: {
      name: 'Hệ thống Quản lý Công việc (Task Management)',
      description: 'Dự án Xây dựng RESTful API Node.js/Express MVC theo chuẩn SRS',
      startDate: new Date('2026-08-01'),
      endDate: new Date('2026-09-30'),
      ownerId: admin.id,
      members: {
        create: [
          { userId: admin.id, role: 'OWNER' },
          { userId: member1.id, role: 'MEMBER' },
          { userId: member2.id, role: 'MEMBER' }
        ]
      }
    }
  });

  console.log('📌 Đang tạo Tasks...');
  await prisma.task.createMany({
    data: [
      {
        title: 'Thiet ke Database Schema va Prisma Models',
        description: 'Tạo schema.prisma kết nối MariaDB bao gồm User, Project, Task',
        status: 'done',
        priority: 'high',
        dueDate: new Date('2026-08-10'),
        projectId: project1.id,
        assigneeId: member1.id
      },
      {
        title: 'Viet RESTful API cho Task Management',
        description: 'Triển khai các route GET, POST, PATCH cho /api/v1/tasks theo chuẩn MVC',
        status: 'doing',
        priority: 'high',
        dueDate: new Date('2026-08-25'),
        projectId: project1.id,
        assigneeId: member1.id
      },
      {
        title: 'Viet Unit Test & Integration Test',
        description: 'Kiểm thử toàn bộ các API Endpoints bằng Postman',
        status: 'todo',
        priority: 'medium',
        dueDate: new Date('2026-09-05'),
        projectId: project1.id,
        assigneeId: member2.id
      },
      {
        title: 'Sửa lỗi giao diện Dashboard',
        description: 'Task này bị quá hạn để test API Thống kê (Statistic)',
        status: 'doing',
        priority: 'high',
        dueDate: new Date('2026-08-15'), // Đã quá hạn so với tháng 8/2026
        projectId: project1.id,
        assigneeId: member2.id
      }
    ]
  });

  console.log('✅ Seed dữ liệu mẫu thành công!');
}

main()
  .catch((e) => {
    console.error('❌ Lỗi khi seed dữ liệu:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });