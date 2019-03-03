const plus = require("./plus");

/**
 * minus
 *
 * Add the given expression to the chain of roll steps with a
 * factor of -1, so that this rollExpr will be subtracted from
 * the final result.
 *
 * @param {string} rollExpr
 * @return {*} this
 */
function minus(rollExpr) {
  return plus.bind(this)(rollExpr, -1);
}

module.exports = minus;
