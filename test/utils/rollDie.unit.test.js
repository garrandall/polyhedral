const rollDie = require("../../lib/utils/rollDie");

describe("rollDie", () => {
  let mockMath;

  beforeAll(() => {
    mockMath = Object.create(Math);
    global.Math = mockMath;
  });

  it("returns appropriately for various die", () => {
    mockMath.random = () => 0.5;

    expect(rollDie(6)).toBe(4);
    expect(rollDie(8)).toBe(5);
    expect(rollDie(100)).toBe(51);
  });

  it("return 1 as a minimum", () => {
    mockMath.random = () => 0;

    expect(rollDie(6)).toBe(1);
    expect(rollDie(8)).toBe(1);
    expect(rollDie(100)).toBe(1);
  });

  it("return faces as a maximum", () => {
    mockMath.random = () => 0.999999999;

    expect(rollDie(6)).toBe(6);
    expect(rollDie(8)).toBe(8);
    expect(rollDie(100)).toBe(100);
  });
});
