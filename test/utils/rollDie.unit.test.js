const rollDie = require("../../lib/utils/rollDie");

describe("rollDie", () => {
  let mockMath;

  beforeAll(() => {
    mockMath = Object.create(Math);
    global.Math = mockMath;
  });

  it.each([["0", 0], ["less than 0", -1], ["null", null]])(
    "throws Error if given %s",
    (desc, die) => {
      expect(() => rollDie(die)).toThrow(Error);
    }
  );

  it("returns appropriately for various die", () => {
    mockMath.random = () => 0.5;

    expect(rollDie({ die: 6 })).toBe(4);
    expect(rollDie({ die: 8 })).toBe(5);
    expect(rollDie({ die: 100 })).toBe(51);
  });

  it("return 1 as a minimum", () => {
    mockMath.random = () => 0;

    expect(rollDie({ die: 6 })).toBe(1);
    expect(rollDie({ die: 8 })).toBe(1);
    expect(rollDie({ die: 100 })).toBe(1);
  });

  it("return die as a maximum", () => {
    mockMath.random = () => 0.999999999;

    expect(rollDie({ die: 6 })).toBe(6);
    expect(rollDie({ die: 8 })).toBe(8);
    expect(rollDie({ die: 100 })).toBe(100);
  });

  it("properly handles highest", () => {
    mockMath.random = jest.fn();
    mockMath.random.mockReturnValueOnce(0.999999999);
    mockMath.random.mockReturnValueOnce(0);

    expect(rollDie({ die: 6, highest: 1, count: 2 })).toBe(6);
    expect(mockMath.random).toHaveBeenCalledTimes(2);
  });

  it("properly handles lowest", () => {
    mockMath.random = jest.fn();
    mockMath.random.mockReturnValueOnce(0.999999999);
    mockMath.random.mockReturnValueOnce(0);

    expect(rollDie({ die: 6, lowest: 1, count: 2 })).toBe(1);
    expect(mockMath.random).toHaveBeenCalledTimes(2);
  });

  it("properly handles multiple highest", () => {
    mockMath.random = jest.fn();
    mockMath.random.mockReturnValueOnce(0.999999999);
    mockMath.random.mockReturnValueOnce(0);
    mockMath.random.mockReturnValueOnce(0.5);
    mockMath.random.mockReturnValueOnce(0.5);

    expect(rollDie({ die: 6, highest: 3, count: 4 })).toBe(14);
    expect(mockMath.random).toHaveBeenCalledTimes(4);
  });

  it("properly handles multiple lowest", () => {
    mockMath.random = jest.fn();
    mockMath.random.mockReturnValueOnce(0.999999999);
    mockMath.random.mockReturnValueOnce(0);
    mockMath.random.mockReturnValueOnce(0.5);
    mockMath.random.mockReturnValueOnce(0.5);

    expect(rollDie({ die: 6, lowest: 3, count: 4 })).toBe(9);
    expect(mockMath.random).toHaveBeenCalledTimes(4);
  });
});
