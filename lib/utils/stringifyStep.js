const stringifyStep = step => {
  const sign = step.factor < 0 ? "-" : "+";
  const factor = Math.abs(step.factor) > 1 ? `(${Math.abs(step.factor)})` : "";
  const d = step.die ? "d" : "";
  const dieMod = step.die || step.mod;
  return sign + factor + d + dieMod;
};

module.exports = stringifyStep;
