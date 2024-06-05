import httpStatus from "http-status";

const validateModel = (model) => async (req, res, next) => {
  const { error } = model.validate(req.body);
  if (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: error.message
    });
    return;
  }
  next();
}

export default validateModel;