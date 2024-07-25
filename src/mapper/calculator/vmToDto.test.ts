import { Direction, YesNo } from "models/calculator";
import { calculateRequestDto } from "./testData/calculateRequestDto";
import { calculationVm } from "./testData/calculationVm";
import mapVmToDto from "./vmToDto";
import { ProductCategory } from "models/common";

describe("mapVmToDto", () => {
  it("should map vm to dto", () => {
    const result = mapVmToDto(calculationVm);
    expect(result).toEqual(calculateRequestDto);
  });

  it("should correctly map the policy holder", () => {
    const result = mapVmToDto({
      ...calculationVm,
      productCategories: [
        ...calculationVm.productCategories,
        ProductCategory.Child,
      ],
      wopCovers: [
        {
          checked: YesNo.Yes,
          code: "WOPSIL",
          directionOfCalculation: Direction.SumAssuredToPremium,
          idxOption: YesNo.Yes,
        },
      ],
    });
    expect(result).toEqual(calculateRequestDto);
  });

  it("should map funds vm to dto", () => {
    const result = mapVmToDto({
      ...calculationVm,
      fundContributions: [
        {
          code: "FUND1",
          funds: [{ allocationValue: "80" }],
        },
      ],
    });
    expect(result.funds_list).toEqual([
      {
        allocation_value: 80,
        cover_idx: 1,
        fund_code: null,
        fund_gtees_list: null,
        fund_risk_profile: null,
      },
    ]);
  });
});
