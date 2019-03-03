const rollDieOnce = die => Math.floor(Math.random() * die) + 1;

const rollDie = ({ die, count = 1, highest, lowest }) => {
  if (!(highest == null) && !(lowest == null)) {
    throw Error("cannot compute highest and lowest of die rolls");
  } else if (!die || die <= 0) {
    throw Error("number of die must be greater than 0");
  }
  let results = Array(count)
    .fill()
    .map(() => rollDieOnce(die));

  if (!(highest == null)) {
    results = results.sort((a, b) => a - b).slice(-highest);
  } else if (!(lowest == null)) {
    results = results.sort((a, b) => b - a).slice(-lowest);
  }

  return results.reduce((accu, a) => accu + a, 0);
};

module.exports = rollDie;
