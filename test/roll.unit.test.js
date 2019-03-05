const roll = require("../lib/roll");
const evalRoll = require("../lib/utils/evalRoll");

jest.mock("../lib/utils/evalRoll", () => jest.fn());

describe("roll", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls evalRoll with this.rollSteps and returns it", () => {
    const rollSteps = [];
    const instance = {
      rollSteps
    };

    evalRoll.mockImplementation(() => [1, 1]);

    expect(roll.bind(instance)()).toEqual(2);
    expect(evalRoll).toHaveBeenCalledTimes(1);
    expect(evalRoll).toHaveBeenCalledWith(rollSteps);
  });
});
