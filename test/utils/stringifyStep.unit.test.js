const stringifyStep = require("../../lib/utils/stringifyStep");

describe("stringifyStep", () => {
  it.each([
    ["+ 7", { mod: 7, sign: 1 }],
    ["+ 7", { mod: 7 }],
    ["- 7", { mod: 7, sign: -1 }],
    ["+ 2d6", { die: 6, sign: 1, count: 2 }],
    ["- 2d6", { die: 6, sign: -1, count: 2 }],
    ["+ 2d6h1", { die: 6, sign: 1, count: 2, highest: 1 }],
    ["+ 2d6l1", { die: 6, sign: 1, count: 2, lowest: 1 }]
  ])("correctly stringifies %s", (output, input) => {
    expect(stringifyStep(input)).toEqual(output);
  });
});
