const evalRoll = require("./utils/evalRoll");

/**
 * roll
 *
 * Computes random results for each accumulated step.
 *
 * @return {number} - The final roll value.
 */
function roll() {
  return evalRoll(this.rollSteps).reduce((a, b) => a + b, 0);
}

module.exports = roll;
