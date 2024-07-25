import { MessageDescriptor } from "react-intl";
import { CalculationStatus } from "models/calculator";
import {
  IChildFuture,
  IHealthProblems,
  ILifeInsurance,
  IPreliminary,
  IRetirement,
  ISavings,
} from "../APK/types";

export type IsAdequateType = number | null;

export type CalculationIdType = number | null;

export type OrderIdType = number | null;

export enum ProductGuid {
  Start = 6304002,
  Comfort = 6101001,
  Retirement = 6303002,
  Savings = 6302002,
  Capital = 6107001,
  Oxygen = 6405003,
}

export type ProductGuidType =
  | ProductGuid.Start
  | ProductGuid.Comfort
  | ProductGuid.Retirement
  | ProductGuid.Savings
  | ProductGuid.Capital
  | ProductGuid.Oxygen;

export const ProductI18nMap: { [key: number]: MessageDescriptor } = {
  [ProductGuid.Start]: { id: "calculator.startInLife" },
  [ProductGuid.Comfort]: { id: "calculator.lifeComfort" },
  [ProductGuid.Retirement]: { id: "calculator.pension" },
  [ProductGuid.Savings]: { id: "calculator.savings" },
  [ProductGuid.Capital]: { id: "calculator.capital" },
  [ProductGuid.Oxygen]: { id: "calculator.oxygen" },
};

// TODO: Revert this commit after fixing values in DB
export enum AdequacyStatus {
  Started = "BAP_STARTED",
  Finished = "BAP_FINISHED",
  Denied = "BAP_DENIED",
}

export enum IddStatus {
  Started = "IDD_STARTED",
  Finished = "IDD_FINISHED",
}

export type AdequacyType =
  | AdequacyStatus.Started
  | AdequacyStatus.Finished
  | AdequacyStatus.Denied
  | null;

export type IddType = IddStatus.Started | IddStatus.Finished | null;

export type StatusType = boolean | null;

interface ICalculationTmpIsAdequate {
  calculation_is_adequate?: StatusType;
}

export interface ISection extends ICalculationTmpIsAdequate {
  value: number | string | null;
}

// TODO: Change back STARTED value to "BOP_STARTED" after fixing value in DB
export enum ReportName {
  BOP = "BOP_REPORT", // finished or denied
  STARTED = "BAP_STARTED", // started or interrupted/aborted
}

export enum IddReportName {
  IDD = "IDD_REPORT",
  STARTED = "IDD_STARTED",
}

export type ReportNameType = ReportName.BOP | ReportName.STARTED | null;

export type IddReportNameType =
  | IddReportName.IDD
  | IddReportName.STARTED
  | null;

export interface IProduct {
  product_guid: ProductGuidType;
  product_name: string;
  product_is_adequate: StatusType;
  raport_name: ReportNameType;
  adequacy_status: AdequacyType;
  meeting_product_id: number;
  idd_raport_name: IddReportNameType;
  idd_status: IddType;
}

export interface IProductWithIllustrations extends IProduct {
  illustrations: IIllustration[];
}

export interface IIllustration extends ICalculationTmpIsAdequate {
  idd_id?: number;
  product_guid: ProductGuidType;
  adequacy_id?: number;
  order_id: OrderIdType;
  expected_amount: ISection;
  premium_total: ISection;
  duration: ISection;
  premium_main_cover: ISection;
  frequency: ISection;
  sum_of_premiums: ISection;
  sum_assured: ISection;
  investment_profile: ISection;
  pru_calc_calculation_id: CalculationIdType;
  status?: CalculationStatus;
  json_needs_analysis: IAPK | null;
}

export interface IAPK {
  version: string;
  preliminary: IPreliminary;
  lifeInsurance: ILifeInsurance;
  healthProblems: IHealthProblems;
  savings: ISavings;
  childFuture: IChildFuture;
  retirement: IRetirement;
}
