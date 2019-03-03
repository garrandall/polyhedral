const validateRollExpr = require('./utils/validateRollExpr');
const parseRollExpr = require('./utils/parseRollExpr');

const advantage = require('./advantage');
const disadvantage = require('./disadvantage');
const minus = require('./minus');
const plus = require('./plus');
const roll = require('./roll');
const sample = require('./sample');

function Polyhedral(rollExpr = null) {
  if (rollExpr) {
    validateRollExpr(rollExpr);
    this.rollSteps = parseRollExpr(rollExpr, { factor: 1 });
  } else {
    this.rollSteps = [];
  }

  this.plus = plus.bind(this);
  this.minus = minus.bind(this);
  this.advantage = advantage.bind(this);
  this.disadvantage = disadvantage.bind(this);

  this.roll = roll.bind(this);
  this.sample = sample.bind(this);

  return this;
}

module.exports = Polyhedral;
