const evalRoll = require("../../lib/utils/evalRoll");
const rollDie = require("../../lib/utils/rollDie");

jest.mock("../../lib/utils/rollDie", () => jest.fn(() => 2));

describe("evalRoll", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns [] when given no steps", () => {
    expect(evalRoll([])).toEqual([]);
  });

  it("returns mod multiplied by sign", () => {
    const steps = [{ mod: 6, sign: -1 }];

    expect(evalRoll(steps)).toEqual([-6]);
  });

  it("rolls die and multiplies by sign", () => {
    const steps = [{ die: 4, sign: -1 }];

    expect(evalRoll(steps)).toEqual([-2]);
  });

  it("uses rollDie to eval step with die field", () => {
    const steps = [{ mod: 5, sign: -1 }, { die: 4, sign: 1 }];

    expect(evalRoll(steps)).toEqual([-5, 2]);
    expect(rollDie).toHaveBeenCalledTimes(1);
    expect(rollDie).toHaveBeenCalledWith({ die: 4, sign: 1 });
  });

  it("passes advantage effect to rollDie", () => {
    const steps = [{ die: 4, sign: 1, highest: 1 }];

    expect(evalRoll(steps)).toEqual([2]);
    expect(rollDie).toHaveBeenCalledTimes(1);
    expect(rollDie).toHaveBeenCalledWith({ die: 4, sign: 1, highest: 1 });
  });

  it("passes disadvantage effect to rollDie", () => {
    const steps = [{ die: 4, sign: 1, lowest: 1 }];

    expect(evalRoll(steps)).toEqual([2]);
    expect(rollDie).toHaveBeenCalledTimes(1);
    expect(rollDie).toHaveBeenCalledWith({ die: 4, sign: 1, lowest: 1 });
  });
});
