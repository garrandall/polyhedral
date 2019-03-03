const rollDie = require('./rollDie');

const evalSingleStep = step => (
  step.factor * (
    step.die == null ? step.mod : rollDie(step.die, step.effect)
  )
);

const evalRoll = steps => steps.reduce((total, step) => (
  total + evalSingleStep(step)
), 0);

module.exports = evalRoll;
