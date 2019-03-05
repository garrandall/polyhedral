const stringifyStep = require("./utils/stringifyStep");

/**
 * stringify
 *
 */
function stringify() {
  if (this.rollSteps == null || this.rollSteps.length === 0) {
    throw ReferenceError(`no roll: ${this.rollSteps}`);
  }

  const str = this.rollSteps.map(step => stringifyStep(step)).join(" ");
  if (str[0] === "+") return str.slice(2);
  return str;
}

module.exports = stringify;
