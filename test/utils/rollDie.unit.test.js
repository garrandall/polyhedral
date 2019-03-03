const rollDie = require('../../lib/utils/rollDie');

describe('rollDie', () => {
  let mockMath;

  beforeAll(() => {
    mockMath = Object.create(Math);
    global.Math = mockMath;
  });

  it.each([
    ['0', 0],
    ['less than 0', -1],
    ['null', null],
  ])('throws Error if given %s', (desc, faces) => {
    expect(() => rollDie(faces)).toThrow(Error);
  });

  it('returns appropriately for various faces', () => {
    mockMath.random = () => 0.5;

    expect(rollDie(6)).toBe(4);
    expect(rollDie(8)).toBe(5);
    expect(rollDie(100)).toBe(51);
  });

  it('return 1 as a minimum', () => {
    mockMath.random = () => 0;

    expect(rollDie(6)).toBe(1);
    expect(rollDie(8)).toBe(1);
    expect(rollDie(100)).toBe(1);
  });

  it('return faces as a maximum', () => {
    mockMath.random = () => 0.999999999;

    expect(rollDie(6)).toBe(6);
    expect(rollDie(8)).toBe(8);
    expect(rollDie(100)).toBe(100);
  });

  it('properly handles advantage', () => {
    mockMath.random = jest.fn();
    mockMath.random.mockReturnValueOnce(0.999999999);
    mockMath.random.mockReturnValueOnce(0);

    expect(rollDie(6, 'advantage')).toBe(6);
    expect(mockMath.random).toHaveBeenCalledTimes(2);
  });

  it('properly handles disadvantage', () => {
    mockMath.random = jest.fn();
    mockMath.random.mockReturnValueOnce(0.999999999);
    mockMath.random.mockReturnValueOnce(0);

    expect(rollDie(6, 'disadvantage')).toBe(1);
    expect(mockMath.random).toHaveBeenCalledTimes(2);
  });
});
