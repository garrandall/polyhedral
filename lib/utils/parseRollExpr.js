const Regex = require("./regex");
const RollStep = require("./RollStep");

const parseModStep = step => ({
  count: parseInt(step.match(Regex.INTEGER)[0], 10),
  faces: 1,
  negative: step.trim().startsWith("-")
});

const parseDieStep = step => {
  const negative = step.startsWith("-");
  const [countStr, dieStr] = step.split(Regex.D);
  const [faces, keepCount] = dieStr
    .split(Regex.LH)
    .map(int => parseInt(int, 10));
  const keep = dieStr.match(Regex.LH);
  let count = 1;
  if (Regex.INTEGER.test(countStr)) {
    count = parseInt(countStr.match(Regex.INTEGER)[0], 10);
  }

  const stepObj = {
    faces,
    negative,
    count
  };

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

  steps = steps.map(step => new RollStep(parseStep(step)));

  // if the whole expression is negative, toggle all step signs.
  if (sign < 0) steps.forEach(step => step.toggleSign());

  return steps;
};

module.exports = parseRollExpr;
