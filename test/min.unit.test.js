const min = require("../lib/min");

describe("min", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls min on each RollStep and sums them", () => {
    const rollSteps = [{ min: jest.fn(() => 5) }, { min: jest.fn(() => 7) }];
    const instance = {
      rollSteps
    };

    expect(min.bind(instance)()).toEqual(12);
    expect(rollSteps[0].min).toHaveBeenCalledTimes(1);
    expect(rollSteps[1].min).toHaveBeenCalledTimes(1);
  });
});
