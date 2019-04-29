/**
 * min
 *
 * Computes minimum of rollSteps
 *
 * @return {number} - The minimum possible roll
 */
function min() {
  return this.rollSteps.map(step => step.min()).reduce((a, b) => a + b, 0);
}

module.exports = min;
