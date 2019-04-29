/**
 * analyze
 *
 * Return mean, min, max of rolls
 *
 * @return {object} - mean, min
 */
function analyze() {
  return {
    min: this.rollSteps.map(step => step.min()).reduce((a, b) => a + b, 0),
    max: this.rollSteps.map(step => step.max()).reduce((a, b) => a + b, 0)
  };
}

module.exports = analyze;
