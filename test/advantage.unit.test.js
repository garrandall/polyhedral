const advantage = require("../lib/advantage");
const parseRollExpr = require("../lib/utils/parseRollExpr");
const validateRollExpr = require("../lib/utils/validateRollExpr");

jest.mock("../lib/utils/parseRollExpr", () => jest.fn());
jest.mock("../lib/utils/validateRollExpr", () => jest.fn());

describe("advantage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    parseRollExpr.mockReturnValue([]);
  });

  it("calls validateRollExpr", () => {
    const instance = {};
    const rollExpr = "test";

    advantage.bind(instance)(rollExpr);

    expect(validateRollExpr).toHaveBeenCalledTimes(1);
    expect(validateRollExpr).toHaveBeenCalledWith(rollExpr);
  });

  it("adds result of parseRollExpr to this.rollSteps", () => {
    const rollExpr = "testExpr";
    const rollSteps = ["old"];
    const instance = { rollSteps };

    parseRollExpr.mockReturnValue(["new"]);

    advantage.bind(instance)(rollExpr);

    expect(instance.rollSteps).toEqual(["old", "new"]);
    expect(parseRollExpr).toHaveBeenCalledTimes(1);
    expect(parseRollExpr).toHaveBeenCalledWith(rollExpr, {
      effect: "advantage"
    });
  });

  it("defaults to a d20", () => {
    const instance = {};

    advantage.bind(instance)();

    expect(parseRollExpr).toHaveBeenCalledTimes(1);
    expect(parseRollExpr).toHaveBeenCalledWith("d20", { effect: "advantage" });
  });

  it("returns this", () => {
    const instance = {};
    expect(advantage.bind(instance)("")).toBe(instance);
  });
});
