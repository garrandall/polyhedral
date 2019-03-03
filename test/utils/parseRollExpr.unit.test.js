const parseRollExpr = require('../../lib/utils/parseRollExpr');

const CASES = [
  ['d4', [{ die: 4, factor: 1 }]],
  ['1d20', [{ die: 20, factor: 1 }]],
  ['2d8', [{ die: 8, factor: 1 }, { die: 8, factor: 1 }]],
  ['1', [{ mod: 1, factor: 1 }]],
  ['+5', [{ mod: 5, factor: 1 }]],
  ['-10', [{ mod: 10, factor: -1 }]],
  ['d6 - 4', [{ die: 6, factor: 1 }, { mod: 4, factor: -1 }]],
  ['d6-4', [{ die: 6, factor: 1 }, { mod: 4, factor: -1 }]],
  ['d6- 4', [{ die: 6, factor: 1 }, { mod: 4, factor: -1 }]],
  ['d6 -4', [{ die: 6, factor: 1 }, { mod: 4, factor: -1 }]],
  ['-1 - d2', [{ mod: 1, factor: -1 }, { die: 2, factor: -1 }]],
  ['- 1 - d2', [{ mod: 1, factor: -1 }, { die: 2, factor: -1 }]],
  ['2d8 + 1d6', [{ die: 8, factor: 1 }, { die: 8, factor: 1 }, { die: 6, factor: 1 }]],
  ['2d8 - 1d6', [{ die: 8, factor: 1 }, { die: 8, factor: 1 }, { die: 6, factor: -1 }]],
  ['1 + 1', [{ mod: 1, factor: 1 }, { mod: 1, factor: 1 }]],
  ['1+1d6', [{ mod: 1, factor: 1 }, { die: 6, factor: 1 }]],
];

describe('parseRollExpr', () => {
  it.each(CASES)('correctly parses %s', (input, output) => {
    expect(parseRollExpr(input)).toEqual(output);
  });

  it('applies factor if given', () => {
    const input = '1 - 1d6';
    const factor = -1;
    expect(parseRollExpr(input, { factor }))
      .toEqual([
        { mod: 1, factor: -1 },
        { die: 6, factor: 1 },
      ]);
  });

  it('adds advantage flag to results if effect is advantage', () => {
    const input = '1 - 1d6';
    const effect = 'advantage';
    expect(parseRollExpr(input, { effect }))
      .toEqual([
        { mod: 1, factor: 1, advantage: true },
        { die: 6, factor: -1, advantage: true },
      ]);
  });

  it('adds disadvantage flag to results if effect is disadvantage', () => {
    const input = '1 - 1d6';
    const effect = 'disadvantage';
    expect(parseRollExpr(input, { effect }))
      .toEqual([
        { mod: 1, factor: 1, disadvantage: true },
        { die: 6, factor: -1, disadvantage: true },
      ]);
  });
});
