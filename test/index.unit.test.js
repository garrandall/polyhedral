const Polyhedral = require("../lib/index");

describe("Polyhedral", () => {
  it("returns this", () => {
    const instance = {};
    expect(Polyhedral.bind(instance)()).toBe(instance);
  });

  it.each(["plus", "minus", "roll", "rollEach", "sample", "stringify"])(
    "binds %s",
    fn => {
      const polyhedral = Polyhedral();
      expect(polyhedral[fn]).toBeDefined();
      expect(polyhedral[fn].prototype).toBeUndefined();
    }
  );
});
