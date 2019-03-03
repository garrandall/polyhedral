const evalRoll = require('./utils/evalRoll');

/**
 * roll
 *
 * Computes a random roll for the accumulated rollSteps.
 *
 * @return {number} - The final roll value.
 */
function roll() {
  return evalRoll(this.rollSteps);
}

module.exports = roll;
