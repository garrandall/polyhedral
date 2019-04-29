const stringify = require("../lib/stringify");

describe("stringify", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls stringify on each RollStep and joins them", () => {
    const rollSteps = [
      { stringify: jest.fn(() => "- d4") },
      { stringify: jest.fn(() => "+ 5") }
    ];
    const instance = {
      rollSteps
    };

    expect(stringify.bind(instance)()).toEqual("- d4 + 5");
    expect(rollSteps[0].stringify).toHaveBeenCalledTimes(1);
    expect(rollSteps[1].stringify).toHaveBeenCalledTimes(1);
  });

  it("trims leading +", () => {
    const rollSteps = [{ stringify: jest.fn(() => "+ d4") }];
    const instance = {
      rollSteps
    };

    expect(stringify.bind(instance)()).toEqual("d4");
    expect(rollSteps[0].stringify).toHaveBeenCalledTimes(1);
  });
});
