const Polyhedral = require("../lib/index");

describe("Polyhedral", () => {
  it("returns this", () => {
    const instance = {};
    expect(Polyhedral.bind(instance)()).toBe(instance);
  });
});
