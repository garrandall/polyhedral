const roll = require("../lib/roll");

describe("roll", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls rollEach and sums result", () => {
    const rollEach = jest.fn(() => [1, 2]);
    const instance = {
      rollEach
    };

    expect(roll.bind(instance)()).toBe(3);
    expect(rollEach).toHaveBeenCalledTimes(1);
  });
});
