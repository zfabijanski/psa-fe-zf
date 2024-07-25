import { YesNo } from "models/calculator";

export enum InvestmentProfile {
  Cautious = "CAUTIOUS",
  Balanced = "BALANCED",
}

export enum Role {
  ALA = "ALA",
  ALA_PH = "ALA_PH",
  MAIN_PH = "MAIN_PH",
  MAIN = "MAIN",
  PH = "PH",
}

export const FrequencyCodeArray = [
  { value: "1", id: "calculator.contribution.1" },
  { value: "2", id: "calculator.contribution.2" },
  { value: "4", id: "calculator.contribution.4" },
  { value: "12", id: "calculator.contribution.12" },
];

export enum ProductCategory {
  Savings = "SAV",
  Investment = "INV",
  Child = "CHILD",
  Protective = "PROT",
  Funds = "FUND",
}

export enum Frequency {
  Annually = "1",
  SemiAnnually = "2",
  Quarterly = "4",
  Monthly = "12",
}

export enum NonStandardFrequency {
  None = "0",
}

export interface IProductConfig {
  product_guid: number;
  product_name: string;
  product_categories: ProductCategory[];
  product_freqs: Frequency[] | NonStandardFrequency[];
  product_covers: IProductCover[];
  product_funds: IProductFund[];
}

export interface IProductCover {
  cover_code: string;
  cover_order: string | number;
  cover_max_add_sum_assured: string | number | null;
  cover_max_duration: string | number | null;
  cover_max_exp_mat_ben: string | number | null;
  cover_max_payments: string | number | null;
  cover_max_premium: string | number | null;
  cover_max_sum_assured: string | number | null;
  cover_max_sum_of_premiums: string | number | null;
  cover_min_add_sum_assured: string | number | null;
  cover_min_duration: string | number | null;
  cover_min_exp_mat_ben: string | number | null;
  cover_min_payments: string | number | null;
  cover_min_premium: string | number | null;
  cover_min_sum_assured: string | number | null;
  max_age_atentry_insured_months: string | number | null;
  min_age_insured_months: string | number | null;
  rop_available: YesNo | null;
}

export interface IProductGuaranteePercentage {
  guarantee_percent: number;
}
export interface IProductGuarantee {
  guarantee_code: string;
  guarantee_name: string;
  guarantee_min_value: string;
  guarantee_duration_months: string;
  guarantee_percentages: IProductGuaranteePercentage[];
}

export interface IProductFund {
  cover_code: string;
  fund_code: string;
  fund_name: string;
  fund_risk_profile: string;
  fund_order: number;
  guarantees: IProductGuarantee[];
}

export interface IProductsConfigMap {
  [code: string]: Omit<IProductConfig, "product_guid">;
}

export enum ValidationErrorType {
  Required = "REQUIRED",
  TooLow = "TOO_LOW",
  TooHigh = "TOO_HIGH",
  AdditionalCoverDurationExceedsMainCover = "ADDITIONAL_COVER_DURATION_EXCEEDS_MAIN_COVER",
  OptionNotAvailable = "OPTION_NOT_AVAILABLE",
  FullThousandsFormatRequired = "FULL_THOUSANDS_FORMAT_REQUIRED",
  FullPlnFormatRequired = "FULL_PLN_FORMAT_REQUIRED",
  PolicyHolderTooYoung = "POLICY_HOLDER_TOO_YOUNG",
  PolicyHolderTooOld = "POLICY_HOLDER_TOO_OLD",
  Full500FormatRequired = "FULL_500_FORMAT_REQUIRED",
  Full100FormatRequired = "FULL_100_FORMAT_REQUIRED",
  InsuredTooYoung = "INSURED_TOO_YOUNG",
  InsuredTooOld = "INSURED_TOO_OLD",
  PercentageIsNot100 = "PERCENTAGE_IS_NOT_100",
}

export interface IMinMax {
  min?: number;
  max?: number;
}

export interface ICoverLimits {
  addSumAssured: IMinMax;
  duration: IMinMax;
  expMatBen: IMinMax;
  payments: IMinMax;
  premium: IMinMax;
  sumAssured: IMinMax;
  sumOfPremiums: IMinMax;
  insuredAge: IMinMax;
  policyHolderAge: IMinMax;
  multiplicity?: number;
}

export interface ICoversLimits {
  [code: string]: ICoverLimits;
}

export interface IFundRiskProfileConfig {
  code: string;
  name_pl: string;
  name_en: string;
  risk_level: number;
  status_code: string;
  notes: string;
}
