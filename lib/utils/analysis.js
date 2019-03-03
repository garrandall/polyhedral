const computeDieEx = (step) => {
  switch (step.effect) {
    case 'advantage':
    case 'disadvantage':
    default:
      return (1 + step.die) / 2;
  }
};

const computeExpectation = steps => (
  steps.reduce(((accu, step) => (
    accu + step.die ? computeDieEx(step) : step.mod * step.factor), 0))
);

module.exports = {
  computeExpectation,
};
