export const sendSuccess = (res, statusCode = 200, message = 'Thành công', data = null, pagination = null) => {
  const response = {
    success: true,
    message,
    data
  };
  if (pagination) response.pagination = pagination;
  return res.status(statusCode).json(response);
};