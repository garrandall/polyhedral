/**
 * sample
 *
 * Samples total results from the accumulated rollSteps count times.
 *
 * @param {number} count - number of samples to take.
 * @return {number[]}
 */
function sample(count = 50) {
  return Array(count)
    .fill()
    .map(this.roll);
}

module.exports = sample;
