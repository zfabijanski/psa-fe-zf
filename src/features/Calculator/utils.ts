import every from "lodash/every";
import isEmpty from "lodash/isEmpty";
import isObject from "lodash/isObject";
import mergeWith from "lodash/mergeWith";
import { ProductCategory } from "../../models/common";
import { CalculationIdType } from "../Products/types";
import { defaultValues } from "./defaultValues";
import { ICalculationVM, ICover, IInsured } from "./types";
import {
  CalculationState,
  CalculationStatus,
  Direction,
} from "models/calculator";
import { Frequency, NonStandardFrequency } from "models/common";
import { FrequencyToMultiplier } from "./validationSchema/coverSchema";
import { formatNumber } from "utils/transformers";

export const mergeWithDefaultValues = (
  values: Partial<ICalculationVM> & {
    productGuid: number;
    productCategories: ProductCategory[];
  }
): ICalculationVM =>
  mergeWith({}, defaultValues, values, (defaultValue, apiValue) => {
    if (Array.isArray(defaultValue) && every(defaultValue, isObject)) {
      return defaultValue.map((currentValue, index) =>
        mergeWith({}, (apiValue || [])[index], currentValue, (x, y) => x || y)
      );
    }

    return apiValue || defaultValue;
  });

export function isCalculation(
  calculation: ICalculationVM | CalculationIdType
): boolean {
  return isObject(calculation) && !isEmpty(calculation);
}

export function getCalculationId(calculation: number | ICalculationVM): number;
export function getCalculationId(
  calculation?: CalculationIdType | ICalculationVM
): number | undefined;
export function getCalculationId(
  calculation: CalculationIdType | ICalculationVM | undefined
) {
  if (!calculation) {
    return;
  }

  if (typeof calculation === "number") {
    return calculation;
  }

  return calculation.calculationId;
}

export function getCalculationStatus(
  calculationsState: { [calculationId: number]: CalculationState },
  calculation?: number | CalculationIdType | ICalculationVM
) {
  const calculationId = getCalculationId(calculation);
  if (!calculationId || !calculationsState[calculationId]) {
    return CalculationStatus.NotCalculated;
  }
  return (
    calculationsState[calculationId].status || CalculationStatus.NotCalculated
  );
}

const getCoverCopy = (cover: ICover, isMain?: boolean): ICover => ({
  ...cover,
  sumAssured:
    cover.directionOfCalculation === Direction.SumAssuredToPremium
      ? cover.sumAssured
      : undefined,
  addSumAssured:
    isMain || cover.directionOfCalculation === Direction.SumAssuredToPremium
      ? cover.addSumAssured
      : undefined,
  premiumPerFreq:
    cover.directionOfCalculation === Direction.PremiumToSumAssured
      ? cover.premiumPerFreq
      : undefined,
  expMatBen:
    cover.directionOfCalculation === Direction.MaturityBenefitToPremium
      ? cover.expMatBen
      : undefined,
});

const getInsuredCopy = (insured: IInsured): IInsured => ({
  ...insured,
  covers: insured.covers && insured.covers.map((cover) => getCoverCopy(cover)),
});

export const getCalculationCopy = (
  calculation: ICalculationVM
): ICalculationVM => ({
  ...calculation,
  calculationId: undefined,
  premiumsTotal: undefined,
  projectedMaturityValueEgrM: undefined,
  guaranteedMaturityBenefit: undefined,
  guaranteedDeathBenefit: undefined,
  mainInsured: getInsuredCopy(calculation.mainInsured),
  policyHolder:
    calculation.policyHolder && getInsuredCopy(calculation.policyHolder),
  additionalLifeAssureds:
    calculation.additionalLifeAssureds &&
    calculation.additionalLifeAssureds.map(getInsuredCopy),
  mainCover: getCoverCopy(calculation.mainCover, true),
  additionalCovers:
    calculation.additionalCovers &&
    calculation.additionalCovers.map((cover) => getCoverCopy(cover)),
  wopCovers:
    calculation.wopCovers &&
    calculation.wopCovers.map((cover) => getCoverCopy(cover)),
});

export const mapDictionaryValues = <T extends object, U>(
  dictionary: T,
  callback: (value: U) => U
) =>
  Object.fromEntries(
    Object.entries(dictionary).map(([key, value]) => [key, callback(value)])
  );

export const filterDictionaryByValue = <T extends object, U>(
  dictionary: T,
  callback: (value: U) => boolean
) =>
  Object.fromEntries(
    Object.entries(dictionary).filter(([key, value]) => callback(value))
  );

export const getResolveParameter =
  (
    name: string,
    min?: number,
    max?: number,
    frequency?: Frequency | NonStandardFrequency
  ) =>
  (paramName: string) => {
    const getMinValue = (
      val?: number,
      frequency?: Frequency | NonStandardFrequency.None
    ) =>
      name && frequency && frequency !== NonStandardFrequency.None
        ? val && FrequencyToMultiplier[frequency] * val
        : val;

    const getMaxValue = (
      val?: number,
      frequency?: Frequency | NonStandardFrequency.None
    ) =>
      name && frequency && frequency !== NonStandardFrequency.None
        ? val && Math.round(val / Number(frequency))
        : val;

    switch (paramName) {
      case "min":
        return formatNumber(getMinValue(min, frequency));
      case "max":
        return formatNumber(getMaxValue(max, frequency));
    }
    return undefined;
  };
