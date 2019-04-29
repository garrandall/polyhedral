/**
 * max
 *
 * Computes maximum of rollSteps
 *
 * @return {number} - The maximum possible roll
 */
function max() {
  return this.rollSteps.map(step => step.max()).reduce((a, b) => a + b, 0);
}

module.exports = max;
