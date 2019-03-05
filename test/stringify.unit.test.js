const stringify = require("../lib/stringify");

describe("stringify", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.each([
    ["5", [{ mod: 5, sign: 1 }]],
    ["- 2d6", [{ die: 6, sign: -1, count: 2 }]],
    [
      "1 + 4d6h2",
      [{ mod: 1, sign: 1 }, { die: 6, count: 4, sign: 1, highest: 2 }]
    ]
  ])("stringifies %s correctly", (expected, rollSteps) => {
    const instance = {
      rollSteps
    };

    expect(stringify.bind(instance)()).toEqual(expected);
  });
});
