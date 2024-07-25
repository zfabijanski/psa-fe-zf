import { ProductGuid } from "features/Products/types";
import {
  mapProductsConfigToProductCoversLimits,
  calculateMultiplicity,
  toNumberOrUndefined,
  emptyCoverLimits,
} from "./productCoversLimits";
import { createProductConfig } from "testUtils";

describe("Function mapProductsConfigToProductCoversLimits", () => {
  it("should map products config to product covers limits", () => {
    expect(
      mapProductsConfigToProductCoversLimits([createProductConfig()])
    ).toMatchSnapshot();
  });

  it("should calculate multiplicity", () => {
    expect(calculateMultiplicity(ProductGuid.Start, "TPDISCH")).toBe(500);
    expect(calculateMultiplicity(ProductGuid.Start, "CICHILD")).toBe(500);
    expect(calculateMultiplicity(ProductGuid.Start, "HRC")).toBe(100);
    expect(calculateMultiplicity(ProductGuid.Start, "ABCD")).toBe(1000);
    expect(calculateMultiplicity(ProductGuid.Comfort, "HRA")).toBe(100);
    expect(calculateMultiplicity(ProductGuid.Comfort, "HRC")).toBe(100);
    expect(calculateMultiplicity(ProductGuid.Comfort, "ABCD")).toBe(1000);
    expect(calculateMultiplicity(ProductGuid.Savings, "HRA")).toBe(100);
    expect(calculateMultiplicity(ProductGuid.Savings, "ABCD")).toBe(1000);
    expect(calculateMultiplicity(ProductGuid.Retirement, "HRA")).toBe(100);
    expect(calculateMultiplicity(ProductGuid.Retirement, "ABCD")).toBe(1000);
    expect(calculateMultiplicity(ProductGuid.Oxygen, "TPDISCH")).toBe(1000);
  });

  it("should convert string to number or undefined", () => {
    expect(toNumberOrUndefined("123")).toBe(123);
    expect(toNumberOrUndefined("abc")).toBe(undefined);
  });
});

describe("emptyCoverLimits", () => {
  it("should return empty cover limits", () => {
    expect(emptyCoverLimits).toMatchInlineSnapshot(`
      Object {
        "addSumAssured": Object {},
        "duration": Object {},
        "expMatBen": Object {},
        "insuredAge": Object {},
        "payments": Object {},
        "policyHolderAge": Object {},
        "premium": Object {},
        "sumAssured": Object {},
        "sumOfPremiums": Object {},
      }
    `);
  });
});
