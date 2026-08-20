import { prisma } from './src/config/database.js'; // Nhớ thêm đuôi .js khi dùng ESM

async function main() {
  try {
    console.log('🔄 Đang kết nối MariaDB thông qua Prisma Adapter...');

    // Tạo thử 1 user
    const newUser = await prisma.user.create({
      data: {
        fullName: 'Nguyễn Văn C',
        email: `adapter_${Date.now()}@gmail.com`,
        password: '$2b$10$hashedpasswordexample'
      }
    });

    console.log('✅ Tạo thành công User qua Driver Adapter:', newUser);

    // Lấy danh sách Users
    const users = await prisma.user.findMany();
    console.log('📊 Danh sách Users hiện tại:', users.length);

  } catch (error) {
    console.error('❌ Lỗi kết nối Adapter:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();