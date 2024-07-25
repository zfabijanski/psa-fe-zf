import { MessageDescriptor } from "react-intl";

export interface IValidationConfig {
  minValueError: {
    value: number;
    message: MessageDescriptor;
  };
  maxValueError: {
    value: number;
    message: MessageDescriptor;
  };
}

export const APKHealthProblemsConfig: { [key: string]: IValidationConfig } = {
  hospitalStayInsuranceSumValue: {
    minValueError: {
      value: 10000,
      message: { id: "apk.healthProblems.insuranceSum.TOO_LOW" },
    },
    maxValueError: {
      value: 50000,
      message: { id: "apk.healthProblems.insuranceSum.TOO_HIGH" },
    },
  },
  seriousIllnessValue: {
    minValueError: {
      value: 10000,
      message: { id: "apk.healthProblems.insuranceSum.TOO_LOW" },
    },
    maxValueError: {
      value: 2000000,
      message: { id: "apk.healthProblems.insuranceSum.TOO_HIGH" },
    },
  },
  seriousDisabilityValue: {
    minValueError: {
      value: 10000,
      message: { id: "apk.healthProblems.insuranceSum.TOO_LOW" },
    },
    maxValueError: {
      value: 2000000,
      message: { id: "apk.healthProblems.insuranceSum.TOO_HIGH" },
    },
  },
  hospitalStayForOneDayValue: {
    minValueError: {
      value: 100,
      message: { id: "apk.healthProblems.benefitValue.TOO_LOW" },
    },
    maxValueError: {
      value: 500,
      message: { id: "apk.healthProblems.benefitValue.TOO_HIGH" },
    },
  },
};
