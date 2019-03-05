const rollDie = require("./rollDie");

const evalSingleStep = step =>
  step.sign * (step.die == null ? step.mod : rollDie(step));

const evalRoll = steps => steps.map(evalSingleStep);

module.exports = evalRoll;
