import { InvestmentProfile } from "../../models/common";
import { YesNo } from "models/calculator";
import { ICalculationVM } from "./types";

export const defaultValues: Omit<
  ICalculationVM,
  "productGuid" | "productCategories"
> = {
  mainInsured: {
    insuredUuid: "",
    dateOfBirth: "",
    covers: [],
  },
  policyHolder: { covers: [] },
  investmentProfile: InvestmentProfile.Cautious,
  indexation: YesNo.Yes,
  ropOption: YesNo.Yes,
  additionalLifeAssureds: [],
  mainCover: {
    code: "",
  },
  additionalCovers: [],
  wopCovers: [],
  fundContributions: [],
};
