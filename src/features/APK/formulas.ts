import {
  APKHealthProblemsConfig,
  IValidationConfig,
} from "./APKHealthProblemsConfig";
import {
  IChildFuture,
  ILifeInsurance,
  IPreliminary,
  IRetirement,
  ISavings,
} from "./types";

export const calculateRetirementPensionAndGap = ({
  incomeValue,
  incomeSource,
}: IPreliminary) => {
  const getPensionValue = (income: number) => {
    const pensionDividerOnFullTimeOrContract = 3;
    const pensionWhenNeitherFullTimeNorContract = 1338;
    if (incomeSource !== "fullTimeOrContract") {
      return incomeValue !== 0 ? pensionWhenNeitherFullTimeNorContract : 0;
    }
    return Math.round(income / pensionDividerOnFullTimeOrContract);
  };
  if (incomeValue !== undefined) {
    const pension = getPensionValue(incomeValue);
    return {
      pension,
      gap: Math.round(incomeValue - pension),
    };
  } else {
    return {
      pension: undefined,
      gap: undefined,
    };
  }
};

export const calculateLifeInsuranceValue = ({
  commitmentValue,
  duration,
  incomeForCollateral,
}: ILifeInsurance): number | undefined => {
  const toZeroIfUndefined = (value?: number): number => value || 0;
  if (incomeForCollateral === undefined || duration === undefined) {
    return;
  }
  return incomeForCollateral * duration + toZeroIfUndefined(commitmentValue);
};

export const calculateChildFutureMissingValue = ({
  expectedValue,
  currentValue,
}: IChildFuture) => {
  if (expectedValue !== undefined) {
    const missingValue = expectedValue - (currentValue || 0);
    return missingValue > 0 ? missingValue : 0;
  }
  return;
};

export const calculateSavingsMissingValue = ({
  valueToSave,
  ownedSavings,
}: ISavings): number | undefined => {
  if (valueToSave !== undefined) {
    const subtractionResult = valueToSave - (ownedSavings || 0);
    return subtractionResult > 0 ? subtractionResult : 0;
  }
  return;
};

export const calculateRetirementRecommendedValue = ({
  increasedBy,
  duration,
}: IRetirement): number | undefined => {
  if (increasedBy === undefined || duration === undefined) {
    return;
  }
  return increasedBy * duration * 12;
};

const getNarrowedValue = (
  validationConfig: IValidationConfig,
  value: number
) => {
  if (value > validationConfig.maxValueError.value) {
    return validationConfig.maxValueError.value;
  } else if (value < validationConfig.minValueError.value) {
    return validationConfig.minValueError.value;
  } else {
    return value;
  }
};

export const getSeriousIllnessRecommendedValue = (
  incomeForCollateral: number
) =>
  getNarrowedValue(
    APKHealthProblemsConfig.seriousIllnessValue,
    incomeForCollateral
  );

export const calculateHealthProblemsAutoCalculatedValues = (
  seriousIllnessRecommendedValue?: number
) => {
  if (seriousIllnessRecommendedValue === undefined) {
    return;
  }

  const hospitalStayInsuranceSumValue = getNarrowedValue(
    APKHealthProblemsConfig.hospitalStayInsuranceSumValue,
    Math.round(0.2 * seriousIllnessRecommendedValue)
  );

  const hospitalStayForOneDayValue = getNarrowedValue(
    APKHealthProblemsConfig.hospitalStayForOneDayValue,
    Math.round(0.01 * hospitalStayInsuranceSumValue)
  );

  const seriousDisabilityValue = getNarrowedValue(
    APKHealthProblemsConfig.seriousDisabilityValue,
    Math.round(2 * seriousIllnessRecommendedValue)
  );

  return {
    hospitalStayInsuranceSumRecommendedValue: hospitalStayInsuranceSumValue,
    hospitalStayForOneDayRecommendedValue: hospitalStayForOneDayValue,
    seriousDisabilityRecommendedValue: seriousDisabilityValue,
  };
};
