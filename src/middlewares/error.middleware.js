import { Prisma } from '@prisma/client';

export const errorHandler = (err, req, res, next) => {
  console.error('🔥 [ERROR LOG]:', err);

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Lỗi hệ thống nội bộ';
  let errors = err.errors || [];

  // 1. Xử lý các lỗi phổ biến từ Prisma ORM
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002': // Lỗi trùng lặp dữ liệu Unique (ví dụ: email đã tồn tại)
        statusCode = 400;
        message = `Dữ liệu trường '${err.meta?.target}' đã tồn tại`;
        break;
      case 'P2003': // Lỗi vi phạm khóa ngoại (Foreign key fails - ID không tồn tại)
        statusCode = 400;
        message = 'Dữ liệu liên kết (ID) không tồn tại hoặc không hợp lệ';
        break;
      case 'P2025': // Không tìm thấy bản ghi cần Update/Delete
        statusCode = 404;
        message = 'Không tìm thấy bản ghi yêu cầu';
        break;
      default:
        statusCode = 400;
        message = 'Lỗi truy vấn cơ sở dữ liệu';
        break;
    }
  } 
  // 2. Xử lý lỗi ép kiểu dữ liệu từ Prisma (ví dụ truyền sai kiểu ID)
  else if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    message = 'Dữ liệu đầu vào không đúng định dạng';
  }

  // 3. Chuẩn hóa Response trả về cho Client theo chuẩn SRS
  return res.status(statusCode).json({
    success: false,
    message,
    ...(errors.length > 0 && { errors })
  });
};