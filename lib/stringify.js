const stringifyStep = require("./utils/stringifyStep");

/**
 * stringify
 *
 * does not support advantage/disadvantage yet
 *
 * supports signs other than 1/-1, but these signs cannot be parsed
 * by the package
 *
 * could be smarter. will repeat the same die instead of condensing
 * ex. d6+d6+d6+d6... instead of Xd6.
 */
function stringify() {
  if (this.rollSteps == null || this.rollSteps.length === 0) {
    throw ReferenceError(`no roll to analyze: ${this.rollSteps}`);
  }

  const str = this.rollSteps.map(step => stringifyStep(step)).join(" ");
  if (str[0] === '+') return str.slice(2);
  return str;
}

module.exports = stringify;
