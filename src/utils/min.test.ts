import { min } from "./min";

describe("Function min", () => {
  it("should return min from array of numbers", () => {
    expect(min(2, 6, 3, 9, 1, 20)).toBe(1);
  });

  it("should return min from array of numbers or undefined", () => {
    expect(min(undefined, 6, 3, 9, undefined, 20)).toBe(3);
  });

  it("should return undefined when no numbers in array", () => {
    expect(min(undefined, undefined, undefined, undefined, undefined)).toBe(
      undefined
    );
  });
});
