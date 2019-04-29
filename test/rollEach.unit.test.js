const rollEach = require("../lib/rollEach");

describe("rollEach", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls eval on each RollStep=", () => {
    const rollSteps = [{ eval: jest.fn(() => 5) }, { eval: jest.fn(() => 7) }];
    const instance = {
      rollSteps
    };

    expect(rollEach.bind(instance)()).toEqual([5, 7]);
    expect(rollSteps[0].eval).toHaveBeenCalledTimes(1);
    expect(rollSteps[1].eval).toHaveBeenCalledTimes(1);
  });
});
