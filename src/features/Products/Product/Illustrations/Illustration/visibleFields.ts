import { Frequency, FrequencyCodeArray } from "../../../../../models/common";
import { formatDuration } from "../../../../../utils/formatters";
import { formatCurrency } from "../../../../../utils/transformers";
import { IIllustration, ProductGuid } from "../../../types";
import { ISection } from "./Section";

const getFrequencyText = (value: string | number | null) => {
  const frequencyCode = FrequencyCodeArray.find(
    (item) => item.value === (value && value.toString())
  );
  return (frequencyCode && frequencyCode.id) || "";
};

const getDurationText = (value: string | number | null) => {
  const numberValue = Number(value);
  if (isNaN(numberValue)) {
    return value;
  }

  const years = Math.floor(numberValue / 12);
  const months = numberValue - years * 12;
  const getYearsFormatted = () => formatDuration(years, "y");
  const getMonthsFormatted = () => formatDuration(months, "M");
  if (years === 0) {
    return getMonthsFormatted();
  } else if (months === 0) {
    return `${getYearsFormatted()}`;
  } else {
    return `${getYearsFormatted()} ${getMonthsFormatted()}`;
  }
};

const getCurrencyText = (value: string | number | null) => {
  const numberValue = Number(value);
  if (isNaN(numberValue)) {
    return value;
  }

  return formatCurrency(numberValue);
};

const expectedAmount = (illustration: IIllustration) => ({
  title: { id: "piwAndBop.expectedAmount" },
  value: getCurrencyText(illustration.expected_amount.value),
  isAdequate: illustration.expected_amount.calculation_is_adequate,
});

const sumOfContribution = (illustration: IIllustration) => ({
  title: { id: "piwAndBop.sumOfContribution" },
  value: getCurrencyText(illustration.sum_of_premiums.value),
  isAdequate: illustration.sum_of_premiums.calculation_is_adequate,
});

const duration = (illustration: IIllustration) => ({
  title: { id: "piwAndBop.durationOfContract" },
  value: getDurationText(illustration.duration.value),
  isAdequate: illustration.duration.calculation_is_adequate,
});

const annualContribution = (illustration: IIllustration) => ({
  title: { id: "piwAndBop.annualContribution" },
  value: getCurrencyText(illustration.premium_main_cover.value),
  isAdequate: null,
});

const paymentFrequency = (illustration: IIllustration) => ({
  title: { id: "piwAndBop.paymentFrequency" },
  shortTitle: { id: "piwAndBop.paymentFrequencyShort" },
  value: { id: getFrequencyText(illustration.frequency.value) },
  isAdequate: illustration.frequency.calculation_is_adequate,
});

const singlePaymentFrequency = (illustration: IIllustration) => ({
  title: { id: "piwAndBop.paymentFrequency" },
  shortTitle: { id: "piwAndBop.paymentFrequencyShort" },
  value: { id: "piwAndBop.singlePaymentFrequency" },
  isAdequate: illustration.frequency.calculation_is_adequate,
});

const sumOfInsurance = (illustration: IIllustration) => ({
  title: { id: "piwAndBop.SumOfInsurance" },
  value: getCurrencyText(illustration.sum_assured.value),
  isAdequate: illustration.sum_assured.calculation_is_adequate,
});

const investmentProfile = (illustration: IIllustration) => ({
  title: { id: "piwAndBop.investmentProfile" },
  value: illustration.investment_profile.value,
  isAdequate: illustration.investment_profile.calculation_is_adequate,
});

const totalPeriodContribution = (illustration: IIllustration) => {
  const getPeriodTitle = () => {
    switch (
      illustration.frequency.value &&
      illustration.frequency.value.toString()
    ) {
      case Frequency.Annually:
        return {
          title: { id: "piwAndBop.totalAnnuallyContribution" },
        };
      case Frequency.SemiAnnually:
        return {
          title: { id: "piwAndBop.totalSemiAnnuallyContribution" },
          shortTitle: { id: "piwAndBop.totalSemiAnnuallyContributionShort" },
        };
      case Frequency.Quarterly:
        return {
          title: { id: "piwAndBop.totalQuarterlyContribution" },
          shortTitle: { id: "piwAndBop.totalQuarterlyContributionShort" },
        };
      case Frequency.Monthly:
        return {
          title: { id: "piwAndBop.totalMonthlyContribution" },
          shortTitle: { id: "piwAndBop.totalMonthlyContributionShort" },
        };
      default:
        return {
          title: { id: "undefined" },
        };
    }
  };
  return {
    ...getPeriodTitle(),
    value: getCurrencyText(illustration.premium_total.value),
    isAdequate: illustration.premium_total.calculation_is_adequate,
  };
};

const durationOfContract = (illustration: IIllustration) => ({
  ...duration(illustration),
  title: {
    id: "piwAndBop.durationOfContract",
  },
});

const contributionMainContract = (illustration: IIllustration) => ({
  title: {
    id: "piwAndBop.contributionMainContract",
  },
  shortTitle: {
    id: "piwAndBop.contributionMainContractShort",
  },
  value: getCurrencyText(illustration.premium_main_cover.value),
  isAdequate: illustration.premium_main_cover.calculation_is_adequate,
});

const singlePaymentContribution = (illustration: IIllustration) => ({
  title: {
    id: "piwAndBop.singlePaymentContribution",
  },
  value: getCurrencyText(illustration.premium_main_cover.value),
  isAdequate: illustration.premium_main_cover.calculation_is_adequate,
});

const capitalPaymentFrequency = (illustration: IIllustration) => ({
  ...paymentFrequency(illustration),
  value: { id: "piwAndBop.AnnualPayments" },
});

const capitalFields = [
  expectedAmount,
  sumOfContribution,
  duration,
  annualContribution,
  capitalPaymentFrequency,
];

const comfortFields = [
  sumOfInsurance,
  totalPeriodContribution,
  durationOfContract,
  contributionMainContract,
  paymentFrequency,
];

const oxygenFields = [
  singlePaymentContribution,
  singlePaymentFrequency,
  investmentProfile,
];

const defaultFields = [
  expectedAmount,
  totalPeriodContribution,
  durationOfContract,
  contributionMainContract,
  paymentFrequency,
];

const getFieldsForProduct = (
  config: Array<(illustration: IIllustration) => ISection>,
  illustration: IIllustration
) => config.map((item) => item(illustration));

export const getVisibleFields = (illustration: IIllustration) => {
  switch (illustration.product_guid) {
    case ProductGuid.Capital:
      return getFieldsForProduct(capitalFields, illustration);
    case ProductGuid.Comfort:
      return getFieldsForProduct(comfortFields, illustration);
    case ProductGuid.Oxygen:
      return getFieldsForProduct(oxygenFields, illustration);
    default:
      return getFieldsForProduct(defaultFields, illustration);
  }
};
