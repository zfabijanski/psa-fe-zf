import { ICalculationVM } from "features/Calculator/types";
import { Frequency, ProductCategory } from "models/common";
import { Direction, YesNo } from "models/calculator";

export const calculationVm: ICalculationVM = {
  calculationId: 1,
  productGuid: 6101001,
  productCategories: [ProductCategory.Protective],
  premiumsTotal: 1000,
  indexation: YesNo.Yes,
  frequencyCode: Frequency.Monthly,
  mainCover: {
    checked: YesNo.Yes,
    code: "LIFECOV",
    duration: 20,
    sumAssured: 2000,
    premiumPerFreq: 100,
    directionOfCalculation: Direction.SumAssuredToPremium,
  },
  additionalCovers: [
    {
      checked: YesNo.No,
      code: "ACCDEATH",
    },
    {
      checked: YesNo.Yes,
      code: "PHRA",
      premiumPerFreq: 100,
      sumAssured: 2000,
      addSumAssured: 20,
      duration: 20,
      directionOfCalculation: Direction.PremiumToSumAssured,
    },
  ],
  wopCovers: [
    {
      checked: YesNo.No,
      code: "WOPTPD",
      idxOption: YesNo.No,
      directionOfCalculation: Direction.SumAssuredToPremium,
    },
    {
      checked: YesNo.Yes,
      code: "WOPSIL",
      idxOption: YesNo.Yes,
      premiumPerFreq: 100,
      directionOfCalculation: Direction.SumAssuredToPremium,
    },
  ],
  policyHolderIsMainInsured: YesNo.Yes,
  mainInsured: {
    insuredUuid: "Jan",
    dateOfBirth: "1990-11-22",
    covers: [],
  },
  policyHolder: { covers: [] },
  additionalLifeAssureds: [
    {
      insuredUuid: "Kazimiera",
      dateOfBirth: "2010-10-20",
      covers: [
        {
          checked: YesNo.Yes,
          code: "TPDISCH",
          premiumPerFreq: 100,
          duration: 20,
          sumAssured: 2000,
          directionOfCalculation: Direction.PremiumToSumAssured,
        },
        {
          checked: YesNo.No,
          code: "HRC",
        },
      ],
    },
  ],
  fundContributions: [],
};
