const stringifyStep = step => {
  const strings = [];
  strings.push(step.sign === -1 ? "-" : "+");
  if (step.die) {
    strings.push(step.count || 1);
    strings.push("d");
    strings.push(step.die);
    if (!(step.highest == null)) {
      strings.push("h");
      strings.push(step.highest);
    } else if (!(step.lowest == null)) {
      strings.push("l");
      strings.push(step.lowest);
    }
  } else if (!(step.mod == null)) {
    strings.push(step.mod);
  }
  return strings.join("");
};

module.exports = stringifyStep;
