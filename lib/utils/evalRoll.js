const rollDie = require("./rollDie");

const evalSingleStep = step =>
  step.sign * (step.die == null ? step.mod : rollDie(step));

const evalRoll = steps =>
  steps.reduce((total, step) => total + evalSingleStep(step), 0);

module.exports = evalRoll;
