const validateRollExpr = require('./utils/validateRollExpr');
const parseRollExpr = require('./utils/parseRollExpr');

/**
 * advantage
 *
 * Add the given expression to the chain of roll steps so that
 * each roll in the rollExpr has the 'advantage' effect - thus
 * will be rolled twice and the higher result will be taken.
 *
 * Called without arguments, the expression will be a d20.
 *
 * @param {string} rollExpr - default 'd20'
 * @return {*} this
 */
function advantage(rollExpr = 'd20') {
  validateRollExpr(rollExpr);
  this.rollSteps = this.rollSteps || [];
  this.rollSteps.push(...parseRollExpr(
    rollExpr,
    { effect: 'advantage' },
  ));
  return this;
}

module.exports = advantage;
