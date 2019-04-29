const parseRollExpr = require("../../lib/utils/parseRollExpr");
const RollStep = require("../../lib/utils/RollStep");

jest.mock("../../lib/utils/RollStep");

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods
  RollStep.mockClear();
});

const CASES = [
  ["d4", [{ faces: 4, negative: false, count: 1 }]],
  ["1d20", [{ faces: 20, negative: false, count: 1 }]],
  ["2d8", [{ faces: 8, negative: false, count: 2 }]],
  ["1", [{ faces: 1, negative: false, count: 1 }]],
  ["+5", [{ faces: 1, negative: false, count: 5 }]],
  ["-10", [{ faces: 1, negative: true, count: 10 }]],
  [
    "d6 - 4",
    [
      { faces: 6, negative: false, count: 1 },
      { faces: 1, count: 4, negative: true }
    ]
  ],
  [
    "d6-4",
    [
      { faces: 6, negative: false, count: 1 },
      { faces: 1, count: 4, negative: true }
    ]
  ],
  [
    "d6- 4",
    [
      { faces: 6, negative: false, count: 1 },
      { faces: 1, count: 4, negative: true }
    ]
  ],
  [
    "d6 -4",
    [
      { faces: 6, negative: false, count: 1 },
      { faces: 1, count: 4, negative: true }
    ]
  ],
  [
    "-1 - d2",
    [
      { faces: 1, count: 1, negative: true },
      { faces: 2, negative: true, count: 1 }
    ]
  ],
  [
    "- 1 - d2",
    [
      { faces: 1, count: 1, negative: true },
      { faces: 2, negative: true, count: 1 }
    ]
  ],
  [
    "2d8 + 1d6",
    [
      { faces: 8, negative: false, count: 2 },
      { faces: 6, negative: false, count: 1 }
    ]
  ],
  [
    "2d8 - 1d6",
    [
      { faces: 8, negative: false, count: 2 },
      { faces: 6, negative: true, count: 1 }
    ]
  ],
  [
    "1 + 1",
    [
      { faces: 1, negative: false, count: 1 },
      { faces: 1, negative: false, count: 1 }
    ]
  ],
  [
    "1+1d6",
    [
      { faces: 1, negative: false, count: 1 },
      { faces: 6, negative: false, count: 1 }
    ]
  ],
  ["2d20h", [{ faces: 20, negative: false, count: 2, highest: 1 }]],
  ["4d6h3", [{ faces: 6, negative: false, count: 4, highest: 3 }]],
  ["-3d4l", [{ faces: 4, negative: true, count: 3, lowest: 1 }]],
  ["10d6l4", [{ faces: 6, negative: false, count: 10, lowest: 4 }]],
  [
    "2d20h + d4 - 2",
    [
      { faces: 20, negative: false, count: 2, highest: 1 },
      { faces: 4, negative: false, count: 1 },
      { faces: 1, negative: true, count: 2 }
    ]
  ]
];

describe("parseRollExpr", () => {
  it.each(CASES)("correctly parses %s", (rollExpr, rollSteps) => {
    parseRollExpr(rollExpr);

    expect(RollStep).toHaveBeenCalledTimes(rollSteps.length);
    rollSteps.forEach(rollStep => {
      expect(RollStep).toHaveBeenCalledWith(rollStep);
    });
  });

  it("applies sign if given", () => {
    const input = "1 - 1d6";
    const sign = -1;

    const results = parseRollExpr(input, { sign });

    expect(results.length).toBe(2);

    expect(RollStep).toHaveBeenCalledWith({
      faces: 1,
      count: 1,
      negative: false
    });

    expect(RollStep).toHaveBeenCalledWith({
      faces: 6,
      count: 1,
      negative: true
    });

    expect(RollStep.prototype.toggleSign).toHaveBeenCalledTimes(2);
  });
});
