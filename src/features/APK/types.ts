export type IIncomeSource = "fullTimeOrContract" | "other" | "unemployed";
export interface ISetQuestionValue {
  setQuestionValue: (
    question: string,
    value?: string | number | boolean
  ) => void;
}

export interface IClientNeed {
  moveValueToCalculator?: boolean;
}

export interface INeedContainer {
  isExpandable: boolean;
}

export interface IPreliminary {
  incomeValue?: number;
  incomeSource?: IIncomeSource;
}

export interface ILifeInsurance extends IClientNeed {
  commitmentValue?: number;
  duration?: number;
  incomeForCollateral?: number;
  recommendedValue?: number;
  shouldRecalculateIncomeForCollateral: boolean;
}
export interface ISavings extends IClientNeed {
  valueToSave?: number;
  ownedSavings?: number;
  missingValue?: number;
}

export interface IChildFuture extends IClientNeed {
  expectedValue?: number;
  currentValue?: number;
  missingValue?: number;
}

export interface IRetirement extends IClientNeed {
  increasedBy?: number;
  duration?: number;
  pension?: number;
  gap?: number;
  recommendedValue?: number;
}

export interface IHealthProblems extends IClientNeed {
  incomeForCollateral?: number;
  hospitalStayInsuranceSumRecommendedValue?: number;
  hospitalStayForOneDayRecommendedValue?: number;
  seriousIllnessRecommendedValue?: number;
  seriousDisabilityRecommendedValue?: number;
  autoRecalculationEnabled?: boolean;
  shouldRecalculateSeriousIllness: boolean;
}
