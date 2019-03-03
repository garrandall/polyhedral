const validateRollExpr = require("./utils/validateRollExpr");
const parseRollExpr = require("./utils/parseRollExpr");

/**
 * plus
 *
 * Add the given expression to the chain of roll steps so that
 * this rollExpr will be added to the final result.
 *
 * @param {string} rollExpr
 * @return {*} this
 */
function plus(rollExpr, factor = 1) {
  validateRollExpr(rollExpr);
  this.rollSteps = this.rollSteps || [];
  this.rollSteps.push(...parseRollExpr(rollExpr, { factor }));
  return this;
}

module.exports = plus;
