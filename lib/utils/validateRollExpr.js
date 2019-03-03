const Regex = require("./regex");
const { InvalidRollExpressionError } = require("./errors");

const validateRollExpr = rollExpr => {
  if (!rollExpr || typeof rollExpr !== "string") {
    throw new InvalidRollExpressionError(
      `rollExpr must be non-empty string: ${rollExpr}`
    );
  }
  const trimmedRollExpr = rollExpr.trim();
  if (
    !trimmedRollExpr.trim().match(Regex.ROLL_EXPR) &&
    !trimmedRollExpr.trim().match(Regex.MODIFIER)
  ) {
    throw new InvalidRollExpressionError(`${rollExpr} could not be parsed`);
  }
  return true;
};

module.exports = validateRollExpr;
