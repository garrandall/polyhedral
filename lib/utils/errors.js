class InvalidRollExpressionError extends Error {
  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, InvalidRollExpressionError);
  }
}

class InvalidRollStepError extends Error {
  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, InvalidRollStepError);
  }
}

module.exports = {
  InvalidRollStepError
};
