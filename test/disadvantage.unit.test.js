const disadvantage = require('../lib/disadvantage');
const parseRollExpr = require('../lib/utils/parseRollExpr');
const validateRollExpr = require('../lib/utils/validateRollExpr');

jest.mock('../lib/utils/parseRollExpr', () => jest.fn());
jest.mock('../lib/utils/validateRollExpr', () => jest.fn());

describe('disadvantage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    parseRollExpr.mockReturnValue([]);
  });

  it('calls validateRollExpr', () => {
    const instance = {};
    const rollExpr = 'test';

    disadvantage.bind(instance)(rollExpr);

    expect(validateRollExpr).toHaveBeenCalledTimes(1);
    expect(validateRollExpr).toHaveBeenCalledWith(rollExpr);
  });

  it('adds result of parseRollExpr to this.rollSteps', () => {
    const rollExpr = 'testExpr';
    const rollSteps = ['old'];
    const instance = { rollSteps };

    parseRollExpr.mockReturnValue(['new']);

    disadvantage.bind(instance)(rollExpr);

    expect(instance.rollSteps).toEqual(['old', 'new']);
    expect(parseRollExpr).toHaveBeenCalledTimes(1);
    expect(parseRollExpr)
      .toHaveBeenCalledWith(rollExpr, { effect: 'disadvantage' });
  });

  it('defaults to a d20', () => {
    const instance = {};

    disadvantage.bind(instance)();

    expect(parseRollExpr).toHaveBeenCalledTimes(1);
    expect(parseRollExpr)
      .toHaveBeenCalledWith('d20', { effect: 'disadvantage' });
  });

  it('returns this', () => {
    const instance = {};
    expect(disadvantage.bind(instance)('')).toBe(instance);
  });
});
