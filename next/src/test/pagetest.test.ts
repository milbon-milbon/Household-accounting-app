import { sum } from "./sumple";

describe("sum function", () => {
  it("should return the sum of two numbers", () => {
    expect(sum(1, 2)).toBe(3);
  });

  it("should return a negative sum when both numbers are negative", () => {
    expect(sum(-1, -2)).toBe(-3);
  });

  it("should return zero when both numbers are zero", () => {
    expect(sum(0, 0)).toBe(0);
  });
});
