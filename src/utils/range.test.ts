import { range } from "./range";

describe("Generating range with start = 0", () => {
  it("should return valid array", () => {
    const result = range(0, 5);
    expect(result).toEqual([0, 1, 2, 3, 4]);
  });
});

describe("Generating range with specified start and stop", () => {
  it("should return valid array", () => {
    const result = range(2, 7);
    expect(result).toEqual([2, 3, 4, 5, 6]);
  });
});

describe("Generating range with specified start, stop and step", () => {
  it("should return valid array", () => {
    const result = range(2, 11, 2);
    expect(result).toEqual([2, 4, 6, 8, 10]);
  });
});
