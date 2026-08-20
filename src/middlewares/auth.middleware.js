export const mockAuth = (req, res, next) => {
  // Lấy user id từ Header 'x-user-id', mặc định là 1 nếu không truyền
  const userId = req.headers['x-user-id'] ? parseInt(req.headers['x-user-id']) : 1;
  req.user = { id: userId };
  next();
};