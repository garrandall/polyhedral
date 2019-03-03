const Regex = require("./regex");

const parseModStep = step => [
  {
    mod: parseInt(step.match(Regex.INTEGER)[0], 10),
    sign: step.trim().startsWith("-") ? -1 : 1
  }
];

const parseDieStep = step => {
  const sign = step.startsWith("-") ? -1 : 1;
  const [countStr, dieStr] = step.split(Regex.D);
  const [die, keepCount] = dieStr.split(Regex.LH).map(int => parseInt(int, 10));
  const keep = dieStr.match(Regex.LH);
  let count = 1;
  if (Regex.INTEGER.test(countStr)) {
    count = parseInt(countStr.match(Regex.INTEGER)[0], 10);
  }

  const stepObj = {
    die,
    sign
  };

  if (count != 1) stepObj.count = count;

  if (keep) {
    if (keep[0] === "h") stepObj.highest = keepCount || 1;
    if (keep[0] === "l") stepObj.lowest = keepCount || 1;
  }

  return stepObj;
};

const parseStep = step =>
  step.match(Regex.D) ? parseDieStep(step) : parseModStep(step);

const parseRollExpr = (rollExpr, { sign = 1 } = {}) => {
  let steps = rollExpr.match(Regex.ROLL_EXPR_STEP) || [];
  if (steps === []) return steps;

  steps = steps
    .map(step => parseStep(step))
    .reduce((arr, next) => arr.concat(next), []);

  steps.forEach(step => {
    // eslint-disable-next-line no-param-reassign
    step.sign *= sign;
  });

  return steps;
};

module.exports = parseRollExpr;
