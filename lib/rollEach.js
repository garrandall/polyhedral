/**
 * rollEach
 *
 * Computes random results for each accumulated step.
 * Unlike roll, this does not sum the results.
 *
 * @return {number[]} - The final roll values.
 */
function rollEach() {
  return this.rollSteps.map(step => step.eval());
}

module.exports = rollEach;
