function errorHandler(error, req, res, next) {
  const statusCode =
    Number.isInteger(error.statusCode) &&
    error.statusCode >= 400 &&
    error.statusCode < 500
      ? error.statusCode
      : 500;

  if (statusCode === 500) {
    console.error(error);
  }

  return res.status(statusCode).json({
    message:
      statusCode === 500
        ? "Erro interno do servidor."
        : error.message,
    ...(error.errors ? { errors: error.errors } : {})
  });
}

module.exports = errorHandler;