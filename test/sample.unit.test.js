const sample = require("../lib/sample");

describe("sample", () => {
  it("calls roll n times", () => {
    const n = 5;
    const roll = jest.fn();
    const instance = {
      roll
    };

    expect(sample.bind(instance)(n));
    expect(roll).toHaveBeenCalledTimes(n);
  });

  it("calls roll 50 times by default", () => {
    const roll = jest.fn();
    const instance = {
      roll
    };

    expect(sample.bind(instance)());
    expect(roll).toHaveBeenCalledTimes(50);
  });
});
