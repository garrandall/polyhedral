const Regex = require('./regex');

const parseModStep = step => [{
  mod: parseInt(step.match(Regex.INTEGER)[0], 10),
  factor: step.trim().startsWith('-') ? -1 : 1,
}];

const parseDieStep = (step) => {
  const factor = step.startsWith('-') ? -1 : 1;
  const [countStr, dieStr] = step.split(Regex.D);

  const die = parseInt(dieStr, 10);
  let count = 1;
  if (Regex.INTEGER.test(countStr)) {
    count = parseInt(countStr.match(Regex.INTEGER)[0], 10);
  }

  return Array(count).fill({ die, factor });
};

const parseStep = step => (
  step.match(Regex.D) ? parseDieStep(step) : parseModStep(step)
);

const parseRollExpr = (rollExpr, { factor = 1, effect = null } = {}) => {
  let steps = rollExpr.match(Regex.ROLL_EXPR_STEP) || [];
  if (steps === []) return steps;

  steps = steps
    .map(step => parseStep(step))
    .reduce((arr, next) => arr.concat(next), []);

  steps.forEach((step) => {
    // eslint-disable-next-line no-param-reassign
    step.factor *= factor;
    // eslint-disable-next-line no-param-reassign
    if (effect === 'advantage') step.advantage = true;
    // eslint-disable-next-line no-param-reassign
    if (effect === 'disadvantage') step.disadvantage = true;
  });

  return steps;
};

module.exports = parseRollExpr;
