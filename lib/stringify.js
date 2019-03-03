const stringifyStep = require("./utils/stringifyStep");

/**
 * stringify
 *
 * does not support advantage/disadvantage yet
 *
 * supports factors other than 1/-1, but these factors cannot be parsed
 * by the package
 *
 * could be smarter. will repeat the same die instead of condensing
 * ex. d6+d6+d6+d6... instead of Xd6.
 */
function stringify() {
  if (this.rollSteps == null || this.rollSteps.length === 0) {
    throw ReferenceError(`no roll to analyze: ${this.rollSteps}`);
  }

  return this.rollSteps.map(step => stringifyStep(step)).join("");
}

module.exports = stringify;
