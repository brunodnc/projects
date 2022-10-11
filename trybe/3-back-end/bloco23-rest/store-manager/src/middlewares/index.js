const errorHandler = (err, _req, res, _next) => {
  const { status, message } = err.cause;
  return res.status(status || 500)
      .json({ message: message || 'Internal Server Error' });
};

module.exports = errorHandler;