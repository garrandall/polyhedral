/**
 * roll
 *
 * Computes random results for each accumulated step.
 *
 * @return {number} - The final roll value.
 */
function roll() {
  return this.rollEach().reduce((a, b) => a + b, 0);
}

module.exports = roll;
