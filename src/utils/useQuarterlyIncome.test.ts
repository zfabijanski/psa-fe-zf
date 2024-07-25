import { renderHook } from "@testing-library/react";
import { useQuarterlyIncome } from "./useQuarterlyIncome";

describe("useQuarterlyIncome", () => {
  it("returns correct values 1", () => {
    const { result } = renderHook(() => useQuarterlyIncome(30, 9, 1, 10000));

    expect(result.current).toEqual([
      2500, 1500, 1500, 1500, 4320, 3750, 0.12, 36000,
    ]);
  });

  it("returns correct values 2", () => {
    const { result } = renderHook(() => useQuarterlyIncome(10, 4, 3, 4200));

    expect(result.current).toEqual([
      2520, 1000, 1000, 1000, 1814, 0, 0.08, 22680,
    ]);
  });
});
