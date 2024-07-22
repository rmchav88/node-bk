const catchError = (error, req, res, next) => {
  next(error);
};

const errorHandler = (error, req, res, next) => {
  res.status(500).json({
    msg: error.message,
    stack: error.stack,
  });
};
const boomErrorHandler = (error, req, res, next) => {
  console.log(error);
  if (error.isBoom) {
    const { output } = error;
    return res.status(output.statusCode).json(output.payload);
  }

  next(error);
};

module.exports = {
  catchError,
  errorHandler,
  boomErrorHandler,
};
