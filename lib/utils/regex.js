const ROLL_EXPR = /^(([-+]\s*)?(\d\d*\s*)?d\d\d*)(\s*(([-+]\s*)(\d*\s*d)?(\d\d*)))*$/i;
const ROLL_EXPR_STEP = /(([-+]\s*)?(\d*d?)?\d\d*)/gi;
const MODIFIER = /(^[+-]?\d\d*$)/g;
const INTEGER = /\d\d*/gi;
const MODIFIED_INTEGER = /[+-]?\s*\d\d*/g;
const D = /d/i;

module.exports = {
  D,
  INTEGER,
  MODIFIER,
  MODIFIED_INTEGER,
  ROLL_EXPR,
  ROLL_EXPR_STEP,
};
