import {
  Frequency,
  InvestmentProfile,
  ProductCategory,
  Role,
} from "models/common";

export type CalculationState = {
  status?: CalculationStatus;
  calculationFeatureChanged: boolean;
};

export interface ICalculationDetailsDto extends ICalculationDto {
  calculation_id: number;
  working_date: string;
  premiums_total: number;
  guaranteed_death_benefit: number | null;
  guaranteed_maturity_benefit: number | null;
  projected_maturity_value_egr_m: number | null;
  product_categories: ProductCategory[];
}

export interface ICalculateResponseDto {
  calculation: ICalculationDetailsDto;
  msg: IMessage[];
}

interface IMessage {
  msg_code: string;
  msg_type: MessageType;
  msg_mesage: string;
  msg_function: string;
  msg_key?: string;
}

export enum MessageType {
  Ok = "OK",
  Error = "ERROR",
}

export interface ICalculationDto {
  uuid: string | null;
  version: string | null;
  source_system: string | null;
  product_guid: number;
  insureds_list: IInsured[];
  covers_list: ICover[];
  funds_list: IFund[];
}

export interface IInsured {
  insured_idx: number;
  insured_uuid: string | null;
  age_in_months: number | null;
  date_of_birth: string | null;
  role: Role;
}

export interface ICover {
  cover_id?: number;
  cover_idx: number;
  insured_idx: number;
  code: string;
  frequency_code: Frequency | null;
  payments: number | null;
  direction_of_calculation: Direction | null;
  investment_profile: InvestmentProfile | null;
  indexation: YesNo | null;
  sum_assured: number | null;
  premium_per_freq: number | null;
  duration: number | null;
  idx_option: YesNo | null;
  rop_option: YesNo | null;
  add_sum_assured: number | null;
  ending_age: number | null;
  exp_mat_ben: number | null;
}

export interface IFundGuarantee {
  gtee_code: string;
  allocation_percent: number;
}

export interface IFund {
  cover_idx: number;
  fund_code: string | null;
  fund_name?: string | null;
  fund_risk_profile: string | null;
  allocation_value: number | null;
  fund_gtees_list?: IFundGuarantee[] | null;
}

export enum Direction {
  PremiumToSumAssured = "PREM_TO_SA",
  SumAssuredToPremium = "SA_TO_PREM",
  MaturityBenefitToPremium = "MATBEN_TO_PREM",
}

export enum YesNo {
  Yes = "Y",
  No = "N",
}

export enum CalculationStatus {
  NotCalculated = "NOT_CALCULATED",
  Invalid = "INVALID",
  Calculated = "CALCULATED",
  Illustrated = "ILUSTRATED",
}
