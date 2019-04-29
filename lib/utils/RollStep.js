const { InvalidRollStepError } = require("./errors");

const rollDie = require("./rollDie");

/**
 * @typedef {Object} Range
 * @property {number} min low end of range
 * @property {number} max high end of range
 */

function _taker(sorter) {
  return (rolls, n) => {
    rolls.sort(sorter);
    rolls.length = n;
    return rolls;
  };
}

class RollStep {
  /**
   * RollStep
   *
   * @param {*} param0
   */
  constructor({
    faces = 1,
    count = 1,
    highest,
    lowest,
    negative = false
  } = {}) {
    if (highest != null && lowest != null) {
      throw new InvalidRollStepError(
        "cannot initialize RollStep with highest and lowest"
      );
    }

    if (count < 0 || faces < 0 || highest < 0 || lowest < 0) {
      throw new InvalidRollStepError(
        `cannot initialize RollStep with negative parameters: ${{
          count,
          faces,
          highest,
          lowest
        }}`
      );
    }

    this._faces = faces;
    this._count = count;
    this._highest = highest || Infinity;
    this._lowest = lowest || Infinity;
    this._sign = negative ? -1 : 1;

    this._takeHighest = (rolls, n) => _taker((a, b) => b - a)(rolls, n);
    this._takeLowest = (rolls, n) => _taker((a, b) => a - b)(rolls, n);
  }

  /**
   * toggleSign
   *
   * flip the sign of the roll step
   */
  toggleSign() {
    this._sign = this._sign * -1;
  }

  /**
   * isNegative
   *
   * @return {Boolean} is the result of this roll step negated?
   */
  isNegative() {
    return this._sign < 0;
  }

  /**
   * keptCount
   *
   * number of die results kept in final outcome. This is not necessarily
   * the same as this._count because the highest or lowest options might
   * result in us actually keeping less results.
   *
   * @return {Number} number of die roll results included in evaluated result.
   */
  keptCount() {
    return Math.min(this._highest, this._lowest, this._count);
  }

  /**
   * eval
   *
   * Evaluate this rollstep, simulating random die rolls.
   *
   * @return {Number} Integer result.
   */
  eval() {
    if (this._faces === 1) {
      return Math.min(this._highest, this._lowest, this._count) * this._sign;
    }

    let rolls = Array(this._count)
      .fill()
      .map(() => rollDie(this._faces));

    if (this._highest < this._count) {
      rolls = this._takeHighest(rolls, this._highest);
    } else if (this._lowest < this._count) {
      rolls = this._takeLowest(rolls, this._lowest);
    }

    const sum = rolls.reduce((a, b) => a + b, 0) * this._sign;

    return sum;
  }

  /**
   * stringify
   *
   * produce a string representation of this RollStep.
   *
   * @param {boolean} space - if true, will include a space between
   * the sign and the rest of the expression. For instace, stringify(true)
   * might produce '+ d6' but stringify(false) might produce '+d6'.
   * @return {string} - Stringified RollStep that can be parsed by
   * Polyhedral.
   */
  stringify({ space = true } = {}) {
    const strings = [];
    strings.push(this._sign < 0 ? "-" : "+");
    if (space) strings.push(" ");

    if (this._faces > 1) {
      strings.push(`${this._count}d${this._faces}`);
      if (this._highest < this._count) {
        strings.push(`h${this._highest}`);
      } else if (this._lowest < this._count) {
        strings.push(`l${this._lowest}`);
      }
    } else if (this._faces === 1) {
      strings.push(this._count);
    } else {
      strings.push("0");
    }

    return strings.join("");
  }

  /**
   * min
   *
   * @return {Number} the minimum evaluated result of the roll.
   */
  min() {
    return (
      this.keptCount() * this._sign * (this.isNegative() ? this._faces : 1)
    );
  }

  /**
   * max
   *
   * @return {Number} the maximum evaluated result of the roll.
   */
  max() {
    return (
      this.keptCount() * this._sign * (this.isNegative() ? 1 : this._faces)
    );
  }

  /**
   * range
   *
   * @return {Range} range of roll step
   */
  range() {
    return [this.min(), this.max()];
  }

  /**
   * expected
   *
   * statistical expected value of the roll. As the number of samples
   * increases, the average of the sample set approaches the expected
   * value.
   *
   * @return {Number} float expected value.
   */
  expected() {
    throw new Error("not implemented");
  }

  /**
   * dist
   *
   * statistical distribution of possible results.
   *
   * @return {*} distribution of roll step.
   */
  dist() {
    throw new Error("not implemented");
  }
}

module.exports = RollStep;
