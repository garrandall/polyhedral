const ROLL_EXPR = /^(([-+] *)?(\d* *)d\d\d*( *[hl]\d*)?)( *([-+] *)(\d* *)d?\d\d*( *[hl]\d*)?)*$/gi;
const ROLL_EXPR_STEP = /([-+] *)?(\d* *)d?\d\d*( *[hl]\d*)?/gi;
const MODIFIER = /(^[+-]?\d\d*$)/g;
const INTEGER = /\d\d*/gi;
const MODIFIED_INTEGER = /[+-]?\s*\d\d*/g;
const D = /d/gi;
const LH = /[lh]/gi;

module.exports = {
  D,
  LH,
  INTEGER,
  MODIFIER,
  MODIFIED_INTEGER,
  ROLL_EXPR,
  ROLL_EXPR_STEP
};
