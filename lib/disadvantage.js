const validateRollExpr = require("./utils/validateRollExpr");
const parseRollExpr = require("./utils/parseRollExpr");

/**
 * disadvantage
 *
 * Add the given expression to the chain of roll steps so that
 * each roll in the rollExpr has the 'disadvantage' effect - thus
 * will be rolled twice and the lower result will be taken.
 *
 * Called without arguments, the expression will be a d20.
 *
 * @param {string} rollExpr - default 'd20'
 * @return {*} this
 */
function disadvantage(rollExpr = "d20") {
  validateRollExpr(rollExpr);
  this.rollSteps = this.rollSteps || [];
  this.rollSteps.push(...parseRollExpr(rollExpr, { effect: "disadvantage" }));
  return this;
}

module.exports = disadvantage;
