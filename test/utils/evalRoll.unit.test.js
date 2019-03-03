const evalRoll = require("../../lib/utils/evalRoll");
const rollDie = require("../../lib/utils/rollDie");

jest.mock("../../lib/utils/rollDie", () => jest.fn(() => 2));

describe("evalRoll", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns 0 when given no steps", () => {
    expect(evalRoll([])).toEqual(0);
  });

  it("returns mod multiplied by factor", () => {
    const steps = [{ mod: 6, factor: -1 }];

    expect(evalRoll(steps)).toEqual(-6);
  });

  it("rolls die and multiplies by factor", () => {
    const steps = [{ die: 4, factor: -1 }];

    expect(evalRoll(steps)).toEqual(-2);
  });

  it("uses rollDie to eval step with die field", () => {
    const steps = [{ mod: 5, factor: -1 }, { die: 4, factor: 1 }];

    expect(evalRoll(steps)).toEqual(-3);
    expect(rollDie).toHaveBeenCalledTimes(1);
    expect(rollDie).toHaveBeenCalledWith(4, undefined);
  });

  it("passes advantage effect to rollDie", () => {
    const steps = [{ die: 4, factor: 1, effect: "advantage" }];

    expect(evalRoll(steps)).toEqual(2);
    expect(rollDie).toHaveBeenCalledTimes(1);
    expect(rollDie).toHaveBeenCalledWith(4, "advantage");
  });

  it("passes disadvantage effect to rollDie", () => {
    const steps = [{ die: 4, factor: 1, effect: "disadvantage" }];

    expect(evalRoll(steps)).toEqual(2);
    expect(rollDie).toHaveBeenCalledTimes(1);
    expect(rollDie).toHaveBeenCalledWith(4, "disadvantage");
  });
});
