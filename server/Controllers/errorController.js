const devErrors = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stackTrace: err.stack,
    error: err,
  });
};

const prodErrors = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong. Please try again.",
    });
  }
};

// Helper to handle duplicate key error
const handleDuplicateFieldsDB = (err) => {
  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];
  const message = `Duplicate field value: '${value}' for '${field}'. Please use another value.`;
  const error = new Error(message);
  error.statusCode = 400;
  error.status = "fail";
  error.isOperational = true;
  return error;
};

// Helper to handle validation error
const handleValidationErrorDB = (err) => {
  const messages = Object.values(err.errors).map((el) => el.message);
  const error = new Error(messages.join(". "));
  error.statusCode = 400;
  error.status = "fail";
  error.isOperational = true;
  return error;
};

// Optional: handle invalid ObjectId (CastError)
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  const error = new Error(message);
  error.statusCode = 400;
  error.status = "fail";
  error.isOperational = true;
  return error;
};

module.exports = (err, req, res, next) => {
  if (res.headersSent) return next(err);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    devErrors(err, res);
  } else {
    let error = { ...err };
    error.message = err.message;

    // Handle specific errors
    if (err.name === "ValidationError") error = handleValidationErrorDB(err);
    if (err.code === 11000) error = handleDuplicateFieldsDB(err);
    if (err.name === "CastError") error = handleCastErrorDB(err);

    prodErrors(error, res);
  }
};
