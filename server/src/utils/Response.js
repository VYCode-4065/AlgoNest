const responseHandler = (res, status, message = "", data = null, error = null, cookies = {}) => {
  return res.status(status).json({
    success: status < 400,
    status,
    message,
    data,
    error,
    cookies
  });
};

export default responseHandler;
