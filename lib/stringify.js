/**
 * stringify
 *
 */
function stringify() {
  if (this.rollSteps == null || this.rollSteps.length === 0) {
    throw ReferenceError(`no rolls: ${this.rollSteps}`);
  }

  const str = this.rollSteps.map(step => step.stringify()).join(" ");
  if (str[0] === "+") return str.slice(1).trim();
  return str;
}

module.exports = stringify;
