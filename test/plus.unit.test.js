const plus = require('../lib/plus');
const parseRollExpr = require('../lib/utils/parseRollExpr');
const validateRollExpr = require('../lib/utils/validateRollExpr');

jest.mock('../lib/utils/parseRollExpr', () => jest.fn());
jest.mock('../lib/utils/validateRollExpr', () => jest.fn());

describe('plus', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    parseRollExpr.mockReturnValue([]);
  });

  it('calls validateRollExpr', () => {
    const instance = {};
    const rollExpr = 'test';

    plus.bind(instance)(rollExpr);

    expect(validateRollExpr).toHaveBeenCalledTimes(1);
    expect(validateRollExpr).toHaveBeenCalledWith(rollExpr);
  });

  it('adds result of parseRollExpr to this.rollSteps', () => {
    const rollExpr = 'testExpr';
    const rollSteps = ['old'];
    const instance = { rollSteps };

    parseRollExpr.mockReturnValue(['new']);

    plus.bind(instance)(rollExpr);

    expect(instance.rollSteps).toEqual(['old', 'new']);
    expect(parseRollExpr).toHaveBeenCalledTimes(1);
    expect(parseRollExpr)
      .toHaveBeenCalledWith(rollExpr, { factor: 1 });
  });

  it('passes factor to parseRollExpr', () => {
    const instance = {};
    const rollExpr = 'test';

    plus.bind(instance)(rollExpr, -1);

    expect(parseRollExpr).toHaveBeenCalledTimes(1);
    expect(parseRollExpr)
      .toHaveBeenCalledWith(rollExpr, { factor: -1 });
  });

  it('returns this', () => {
    const instance = {};
    expect(plus.bind(instance)('')).toBe(instance);
  });
});
