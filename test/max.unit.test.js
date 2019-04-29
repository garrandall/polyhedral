const max = require("../lib/max");

describe("max", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls max on each RollStep and sums them", () => {
    const rollSteps = [{ max: jest.fn(() => 5) }, { max: jest.fn(() => 7) }];
    const instance = {
      rollSteps
    };

    expect(max.bind(instance)()).toEqual(12);
    expect(rollSteps[0].max).toHaveBeenCalledTimes(1);
    expect(rollSteps[1].max).toHaveBeenCalledTimes(1);
  });
});
