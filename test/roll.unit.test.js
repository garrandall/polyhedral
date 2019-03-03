const roll = require('../lib/roll');
const evalRoll = require('../lib/utils/evalRoll');

jest.mock('../lib/utils/evalRoll', () => jest.fn());

describe('roll', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls evalRoll with this.rollSteps and returns it', () => {
    const rollSteps = [];
    const instance = {
      rollSteps,
    };

    evalRoll.mockImplementation(() => 'test');

    expect(roll.bind(instance)()).toEqual('test');
    expect(evalRoll).toHaveBeenCalledTimes(1);
    expect(evalRoll).toHaveBeenCalledWith(rollSteps);
  });
});
