class InvalidRollExpressionError extends Error {
  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, InvalidRollExpressionError);
  }
}

module.exports = {
  InvalidRollExpressionError,
};
