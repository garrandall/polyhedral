const computeKeepHighestEx = step => {
  // const d = step.die;
  // const upto = Array.from(new Array(d),(_,i)=>i);
  // return upto.reduce(
  //   ((accu, m) =>
  //     accu + m * (2 * m - 1) / (m * m),
  //   0)
  // );
};

const computeDieEx = step => {
  if (!(step.highest == null)) {
    return computeKeepHighestEx(step);
  } else if (!(step.lowest == null)) {
    return computeKeepLowestEx(step);
  } else {
    return ((1 + step.die) * (step.count || 1)) / 2;
  }
};

const computeExpectation = steps =>
  steps.reduce(
    ((accu, step) =>
      accu + step.die ? computeDieEx(step) : step.mod * step.sign,
    0)
  );

module.exports = {
  computeExpectation
};
