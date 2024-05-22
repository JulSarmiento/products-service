import httpStatus from "http-status";

const errorHandler = (err, _req, res, _next) => {
  const { statusCode, message } = err;

  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    status: statusCode,
    code: httpStatus.INTERNAL_SERVER_ERROR,
    message
  });
};

export default errorHandler