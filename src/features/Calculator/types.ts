import { Frequency, InvestmentProfile, ProductCategory } from "models/common";
import { Direction, YesNo } from "models/calculator";

export interface ICalculationVM {
  calculationId?: number;
  productGuid: number;
  productCategories: ProductCategory[];
  premiumsTotal?: number;
  guaranteedDeathBenefit?: number;
  guaranteedMaturityBenefit?: number;
  projectedMaturityValueEgrM?: number;

  policyHolderIsMainInsured?: YesNo;
  mainInsured: IInsured;
  policyHolder: IInsured;
  additionalLifeAssureds: IInsured[];

  investmentProfile?: InvestmentProfile;
  indexation?: YesNo;
  ropOption?: YesNo;
  ropAvailable?: YesNo;
  frequencyCode?: Frequency;

  mainCover: ICover;
  additionalCovers: ICover[];
  wopCovers: ICover[];
  fundContributions: Array<Partial<IFundContribution>>;
}

export interface IInsured extends Object {
  checked?: YesNo;
  insuredUuid?: string;
  dateOfBirth?: string;
  covers: ICover[];
}

export interface ICover {
  checked?: YesNo;

  code: string;
  payments?: number;
  directionOfCalculation?: Direction;
  sumAssured?: number;
  premiumPerFreq?: number;
  duration?: number;
  idxOption?: YesNo;
  addSumAssured?: number;
  expMatBen?: number;
  sumOfPremiums?: number;
}

export interface IFundContribution {
  code: string;
  namePL: string;
  nameEN: string;
  riskLevel: number;
  statusCode: string;
  notes: string;
  funds: Array<Partial<IFund>>;
}

export interface IFundGuarantee {
  guaranteeCode: string;
  guaranteeName: string;
  guaranteePercentageAvailable: string[];
  guaranteeChecked: boolean;
  guaranteeValue: string;
}

export interface IFund {
  fundCode: string;
  fundName: string;
  fundRiskProfile: string;
  allocationValue: string;
  allocationAmount: string;
  fundOrder: number;
  coverIdx: number;
  guarantee: IFundGuarantee;
}

export interface ICalculatorCoversConfig {
  coverName: string;
  isHospital: boolean;
  isChild: boolean;
}

export interface ICoversConfigMap {
  [code: string]: ICalculatorCoversConfig;
}

export interface IProductCovers {
  mainCover: string;
  additionalCovers: string[];
  wopCovers: string[];
  childCovers: string[];
}

export interface IProductCoversMap {
  [key: number]: IProductCovers;
}

export type ValueType =
  | YesNo
  | string
  | number
  | Frequency
  | InvestmentProfile
  | Direction
  | undefined
  | null;
