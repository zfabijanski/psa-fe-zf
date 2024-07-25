import { MessageDescriptor } from "react-intl";
import { ProductCategory } from "../../../models/common";

export interface IFieldConfig {
  id: string;
  span: number;
  tooltip?: string | MessageDescriptor;
}

export interface IFieldsConfig {
  product: IFieldConfig;
  [key: string]: IFieldConfig;
}

const SavingsFieldsConfig: IFieldsConfig = {
  product: {
    id: "calculator.mainContract",
    span: 4,
  },
  exp_mat_ben: {
    id: "calculator.mainExpectedAmount",
    span: 3,
  },
  sum_assured: {
    id: "calculator.mainGuaranteedAmount",
    tooltip: { id: "calculator.mainGuaranteedAmount.tooltip" },
    span: 3,
  },
  duration: {
    id: "calculator.mainDuration",
    span: 3,
  },
  premium_per_freq: {
    id: "calculator.mainContribution",
    span: 3,
  },
};

const InvestmentFieldsConfig: IFieldsConfig = {
  product: {
    id: "calculator.mainContract",
    span: 4,
  },
  premium_per_freq: {
    id: "calculator.yearlyContribution",
    span: 3,
  },
  payments: {
    id: "calculator.payingPeriod",
    span: 3,
  },
  duration: {
    id: "calculator.mainDuration",
    span: 3,
  },
  premium_sum: {
    id: "calculator.contributionSum",
    span: 3,
  },
};
const FundsFieldsConfig: IFieldsConfig = {
  product: {
    id: "calculator.mainContract",
    span: 12,
  },
  premium_per_freq: {
    id: "calculator.baseContribution",
    span: 4,
  },
};

const OtherFieldsConfig: IFieldsConfig = {
  product: {
    id: "calculator.mainContract",
    span: 7,
  },
  sum_assured: {
    id: "calculator.sumOfInsurance",
    span: 3,
  },
  duration: {
    id: "calculator.mainDuration",
    span: 3,
  },
  premium_per_freq: {
    id: "calculator.mainContribution",
    span: 3,
  },
};

export const getFieldsConfiguration = (
  productCategories: ProductCategory[]
) => {
  if (productCategories.includes(ProductCategory.Savings)) {
    return SavingsFieldsConfig;
  } else if (productCategories.includes(ProductCategory.Investment)) {
    return InvestmentFieldsConfig;
  } else if (productCategories.includes(ProductCategory.Funds)) {
    return FundsFieldsConfig;
  } else {
    return OtherFieldsConfig;
  }
};
