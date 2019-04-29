const RollStep = require("../../lib/utils/RollStep");
const rollDie = require("../../lib/utils/rollDie");
const { InvalidRollStepError } = require("../../lib/utils/errors");

jest.mock("../../lib/utils/rollDie", () => jest.fn());

describe("RollStep", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("constructor", () => {
    it("correctly assigns properties", () => {
      const rollStep = new RollStep({
        count: 2,
        faces: 8,
        negative: false
      });

      expect(rollStep._count).toBe(2);
      expect(rollStep._faces).toBe(8);
      expect(rollStep._sign).toBe(1);
    });

    it("correctly assigns highest", () => {
      const rollStep = new RollStep({
        highest: 2
      });

      expect(rollStep._highest).toBe(2);
    });

    it("correctly assigns lowest", () => {
      const rollStep = new RollStep({
        lowest: 2
      });

      expect(rollStep._lowest).toBe(2);
    });

    it("throws InvalidRollStepError if highest and lowest both given", () => {
      expect(() => {
        new RollStep({
          lowest: 2,
          highest: 2
        });
      }).toThrow(InvalidRollStepError);
    });

    it("throws InvalidRollStepError if count < 0", () => {
      expect(() => {
        new RollStep({
          count: -1
        });
      }).toThrow(InvalidRollStepError);
    });

    it("throws InvalidRollStepError if faces < 0", () => {
      expect(() => {
        new RollStep({
          faces: -1
        });
      }).toThrow(InvalidRollStepError);
    });

    it("throws InvalidRollStepError if highest < 0", () => {
      expect(() => {
        new RollStep({
          highest: -1
        });
      }).toThrow(InvalidRollStepError);
    });

    it("throws InvalidRollStepError if lowest < 0", () => {
      expect(() => {
        new RollStep({
          lowest: -1
        });
      }).toThrow(InvalidRollStepError);
    });
  });

  describe("prototype.toggleSign", () => {
    it("works with negative sign", () => {
      const rollStep = new RollStep({ negative: true });
      expect(rollStep._sign).toBe(-1);

      rollStep.toggleSign();

      expect(rollStep._sign).toBe(1);
    });

    it("works with positive sign", () => {
      const rollStep = new RollStep({ negative: false });
      expect(rollStep._sign).toBe(1);

      rollStep.toggleSign();

      expect(rollStep._sign).toBe(-1);
    });
  });

  describe("prototype.isNegative", () => {
    it("returns true if negative", () => {
      const rollStep = new RollStep({ negative: true });

      expect(rollStep.isNegative()).toBeTruthy();
    });

    it("returns false if positive", () => {
      const rollStep = new RollStep({ negative: false });

      expect(rollStep.isNegative()).toBeFalsy();
    });
  });

  describe("prototype.keptCount", () => {
    it("works with highest", () => {
      const rollStep = new RollStep({ count: 5, highest: 3 });
      expect(rollStep.keptCount()).toBe(3);
    });

    it("works with lowest", () => {
      const rollStep = new RollStep({ count: 5, lowest: 3 });
      expect(rollStep.keptCount()).toBe(3);
    });

    it("works with greater highest", () => {
      const rollStep = new RollStep({ count: 5, highest: 7 });
      expect(rollStep.keptCount()).toBe(5);
    });

    it("works with greater lowest", () => {
      const rollStep = new RollStep({ count: 5, lowest: 7 });
      expect(rollStep.keptCount()).toBe(5);
    });

    it("works with zero", () => {
      const rollStep = new RollStep({ count: 0 });
      expect(rollStep.keptCount()).toBe(0);
    });
  });

  describe("prototype.eval", () => {
    beforeEach(() => {
      rollDie.mockImplementation(faces => Math.ceil(faces / 2));
    });

    it("calls rollDie 'count' times", () => {
      const rollStep = new RollStep({ count: 4, faces: 6 });

      const result = rollStep.eval();

      expect(rollDie).toHaveBeenCalledTimes(4);
      expect(result).toBe(12);
    });

    it("correctly takes lowest", () => {
      const rollStep = new RollStep({ count: 3, faces: 20, lowest: 2 });

      rollDie.mockImplementationOnce(faces => 18);
      rollDie.mockImplementationOnce(faces => 10);
      rollDie.mockImplementationOnce(faces => 5);

      const result = rollStep.eval();

      expect(rollDie).toHaveBeenCalledTimes(3);
      expect(result).toBe(15);
    });

    it("correctly takes highest", () => {
      const rollStep = new RollStep({ count: 3, faces: 20, highest: 2 });

      rollDie.mockImplementationOnce(faces => 18);
      rollDie.mockImplementationOnce(faces => 10);
      rollDie.mockImplementationOnce(faces => 5);

      const result = rollStep.eval();

      expect(rollDie).toHaveBeenCalledTimes(3);
      expect(result).toBe(28);
    });

    it("correctly handles only one face", () => {
      const rollStep = new RollStep({ count: 3, faces: 1 });

      const result = rollStep.eval();

      expect(rollDie).toHaveBeenCalledTimes(0);
      expect(result).toBe(3);
    });
  });

  describe("prototype.stringify", () => {
    it.each([
      ["+ 7", { faces: 1, count: 7, negative: false }],
      ["+ 7", { faces: 1, count: 7 }],
      ["- 7", { faces: 1, count: 7, negative: true }],
      ["+ 2d6", { faces: 6, count: 2, negative: false }],
      ["- 2d6", { faces: 6, count: 2, negative: true }],
      ["+ 2d6h1", { faces: 6, count: 2, highest: 1, negative: false }],
      ["+ 2d6l1", { faces: 6, count: 2, lowest: 1, negative: false }]
    ])("correctly stringifies %s", (output, input) => {
      const rollStep = new RollStep(input);
      expect(rollStep.stringify()).toEqual(output);
    });

    it("respects space option", () => {
      const rollStep = new RollStep({
        faces: 6,
        count: 2,
        negative: false
      });

      expect(rollStep.stringify()).toEqual("+ 2d6");
      expect(rollStep.stringify({ space: true })).toEqual("+ 2d6");
      expect(rollStep.stringify({ space: false })).toEqual("+2d6");
    });
  });

  describe("prototype.min", () => {
    it.each([
      [{ count: 1, faces: 1 }, 1],
      [{ count: 2, faces: 4 }, 2],
      [{ count: 20, faces: 10, highest: 5 }, 5],
      [{ count: 20, faces: 10, lowest: 5 }, 5],
      [{ count: 10, faces: 5, negative: true }, -50],
      [{ count: 5, faces: 8, highest: 3, negative: true }, -24],
      [{ count: 0 }, 0]
    ])("returns correct minimum for %s", (params, expected) => {
      const rollStep = new RollStep(params);
      expect(rollStep.min()).toBe(expected);
    });
  });

  describe("prototype.max", () => {
    it.each([
      [{ count: 1, faces: 1 }, 1],
      [{ count: 2, faces: 4 }, 8],
      [{ count: 20, faces: 10, highest: 5 }, 50],
      [{ count: 20, faces: 10, lowest: 5 }, 50],
      [{ count: 10, faces: 5, negative: true }, -10],
      [{ count: 5, faces: 8, highest: 3, negative: true }, -3]
    ])("returns correct maximum for %s", (params, expected) => {
      const rollStep = new RollStep(params);
      expect(rollStep.max()).toBe(expected);
    });
  });

  describe("prototype.range", () => {
    it("uses .min and .max", () => {
      const rollStep = new RollStep();
      rollStep.min = jest.fn(() => 600);
      rollStep.max = jest.fn(() => 1200);

      expect(rollStep.range()).toEqual([600, 1200]);
    });
  });

  describe("prototype.expected", () => {});

  describe("prototype.dist", () => {});
});
