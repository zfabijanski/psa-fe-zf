import { Frequency, NonStandardFrequency } from "models/common";
import { getResolveParameter } from "./utils";
import { formatNumber } from "utils/transformers";

describe("Calculator utils", () => {
  describe("getResolveParameter", () => {
    it('should return undefined if paramName is not "min" or "max"', () => {
      const result = getResolveParameter("testName")("testParamName");
      expect(result).toBeUndefined();
    });

    it('should return min value if paramName is "min"', () => {
      const result = getResolveParameter("testName", 165, 50000)("min");
      expect(result).toEqual(formatNumber(165));
    });

    it('should return max value if paramName is "max"', () => {
      const result = getResolveParameter("testName", 165, 50000)("max");
      expect(result).toMatch(formatNumber(50000));
    });

    it('should return min value multiplied by frequency if frequency is not "None"', () => {
      const result = getResolveParameter(
        "testName",
        165,
        50000,
        Frequency.Annually
      )("min");
      expect(result).toEqual(formatNumber(1980));
    });

    it('should return max value divided by frequency if frequency is not "None"', () => {
      const result = getResolveParameter(
        "testName",
        165,
        50000,
        Frequency.Quarterly
      )("max");
      expect(result).toMatch(formatNumber(12500));
    });

    it("should return max value for non-standard frequency", () => {
      const result = getResolveParameter(
        "testName",
        165,
        50000,
        NonStandardFrequency.None
      )("max");
      expect(result).toMatch(formatNumber(50000));
    });

    it("should return min value for non-standard frequency", () => {
      const result = getResolveParameter(
        "testName",
        165,
        50000,
        NonStandardFrequency.None
      )("min");
      expect(result).toEqual(formatNumber(165));
    });
  });
});
