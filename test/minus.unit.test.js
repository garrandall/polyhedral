const minus = require("../lib/minus");
const plus = require("../lib/plus");

jest.mock("../lib/plus", () => jest.fn());

describe("minus", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls plus with negative factor", () => {
    const instance = {};
    const rollExpr = "test";

    minus.bind(instance)(rollExpr);

    expect(plus).toHaveBeenCalledTimes(1);
    expect(plus).toHaveBeenCalledWith(rollExpr, -1);
  });

  it("returns this", () => {
    const instance = {};
    plus.mockReturnValue(instance);
    expect(minus.bind(instance)("")).toBe(instance);
  });
});
