const evalRoll = require("./utils/evalRoll");

/**
 * sample
 *
 * Samples results from the accumulated rollSteps count times.
 *
 * @param {number} count - number of samples to take.
 * @return {number[]}
 */
function sample(count = 50) {
  return Array(count)
    .fill()
    .map(() => evalRoll(this.rollSteps));
}

module.exports = sample;
