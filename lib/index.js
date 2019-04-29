const validateRollExpr = require("./utils/validateRollExpr");
const parseRollExpr = require("./utils/parseRollExpr");

const max = require("./max");
const min = require("./min");
const minus = require("./minus");
const plus = require("./plus");
const roll = require("./roll");
const rollEach = require("./rollEach");
const sample = require("./sample");
const stringify = require("./stringify");

function Polyhedral(rollExpr = null) {
  if (rollExpr) {
    validateRollExpr(rollExpr);
    this.rollSteps = parseRollExpr(rollExpr, { sign: 1 });
  } else {
    this.rollSteps = [];
  }

  this.plus = plus.bind(this);
  this.minus = minus.bind(this);

  this.roll = roll.bind(this);
  this.rollEach = rollEach.bind(this);
  this.sample = sample.bind(this);
  this.stringify = stringify.bind(this);

  this.min = min.bind(this);
  this.max = max.bind(this);

  return this;
}

module.exports = Polyhedral;
