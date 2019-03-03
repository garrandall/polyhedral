const sample = require('../lib/sample');
const evalRoll = require('../lib/utils/evalRoll');

jest.mock('../lib/utils/evalRoll', () => jest.fn());

describe('sample', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls evalRoll with this.rollSteps count times', () => {
    const count = 5;
    const rollSteps = [];
    const instance = {
      rollSteps,
    };
    const expected = ['test', 'test', 'test', 'test', 'test'];

    evalRoll.mockImplementation(() => 'test');

    expect(sample.bind(instance)(count)).toEqual(expected);
    expect(evalRoll).toHaveBeenCalledTimes(count);
    expect(evalRoll).toHaveBeenCalledWith(rollSteps);
  });

  it('defaults to 50 samples', () => {
    const rollSteps = [];
    const instance = {
      rollSteps,
    };

    const expected = Array(50).fill('test');
    evalRoll.mockImplementation(() => 'test');

    expect(sample.bind(instance)()).toEqual(expected);
    expect(evalRoll).toHaveBeenCalledTimes(50);
  });
});
