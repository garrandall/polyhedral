const sample = require("../lib/sample");
const evalRoll = require("../lib/utils/evalRoll");

jest.mock("../lib/utils/evalRoll", () => jest.fn());

describe("sample", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls evalRoll with this.rollSteps count times", () => {
    const count = 5;
    const rollSteps = [];
    const instance = {
      rollSteps
    };
    const expected = [3, 3, 3, 3, 3];

    evalRoll.mockImplementation(() => [1, 2]);

    expect(sample.bind(instance)(count)).toEqual(expected);
    expect(evalRoll).toHaveBeenCalledTimes(count);
    expect(evalRoll).toHaveBeenCalledWith(rollSteps);
  });

  it("defaults to 50 samples", () => {
    const rollSteps = [];
    const instance = {
      rollSteps
    };

    const expected = Array(50).fill(1);
    evalRoll.mockImplementation(() => [1]);

    expect(sample.bind(instance)()).toEqual(expected);
    expect(evalRoll).toHaveBeenCalledTimes(50);
  });
});
