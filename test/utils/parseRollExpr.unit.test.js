const parseRollExpr = require("../../lib/utils/parseRollExpr");

const CASES = [
  ["d4", [{ die: 4, sign: 1 }]],
  ["1d20", [{ die: 20, sign: 1 }]],
  ["2d8", [{ die: 8, sign: 1, count: 2 }]],
  ["1", [{ mod: 1, sign: 1 }]],
  ["+5", [{ mod: 5, sign: 1 }]],
  ["-10", [{ mod: 10, sign: -1 }]],
  ["d6 - 4", [{ die: 6, sign: 1 }, { mod: 4, sign: -1 }]],
  ["d6-4", [{ die: 6, sign: 1 }, { mod: 4, sign: -1 }]],
  ["d6- 4", [{ die: 6, sign: 1 }, { mod: 4, sign: -1 }]],
  ["d6 -4", [{ die: 6, sign: 1 }, { mod: 4, sign: -1 }]],
  ["-1 - d2", [{ mod: 1, sign: -1 }, { die: 2, sign: -1 }]],
  ["- 1 - d2", [{ mod: 1, sign: -1 }, { die: 2, sign: -1 }]],
  ["2d8 + 1d6", [{ die: 8, sign: 1, count: 2 }, { die: 6, sign: 1 }]],
  ["2d8 - 1d6", [{ die: 8, sign: 1, count: 2 }, { die: 6, sign: -1 }]],
  ["1 + 1", [{ mod: 1, sign: 1 }, { mod: 1, sign: 1 }]],
  ["1+1d6", [{ mod: 1, sign: 1 }, { die: 6, sign: 1 }]],
  ["2d20h", [{ die: 20, sign: 1, count: 2, highest: 1 }]],
  ["4d6h3", [{ die: 6, sign: 1, count: 4, highest: 3 }]],
  ["-3d4l", [{ die: 4, sign: -1, count: 3, lowest: 1 }]],
  ["10d6l4", [{ die: 6, sign: 1, count: 10, lowest: 4 }]],
  [
    "2d20h + d4 - 2",
    [
      { die: 20, sign: 1, count: 2, highest: 1 },
      { die: 4, sign: 1 },
      { mod: 2, sign: -1 }
    ]
  ]
];

describe("parseRollExpr", () => {
  it.each(CASES)("correctly parses %s", (input, output) => {
    expect(parseRollExpr(input)).toEqual(output);
  });

  it("applies sign if given", () => {
    const input = "1 - 1d6";
    const sign = -1;
    expect(parseRollExpr(input, { sign })).toEqual([
      { mod: 1, sign: -1 },
      { die: 6, sign: 1 }
    ]);
  });
});
