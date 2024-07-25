import { useIntl } from "react-intl";
import { formatCurrency } from "./transformers";
import { ReactNode } from "react";

export enum EValueToFormatType {
  currency = "currency",
  dateY = "dateY",
  dateYM = "dateYM",
  percent = "percent",
}

export type TValueToFormat = string | number | boolean | unknown;
export type TFormatValue = React.ReactNode;

export const formatValue = (
  valueType?: EValueToFormatType,
  value?: TValueToFormat,
  intl?: ReturnType<typeof useIntl>
) => {
  const shortYearSuffix = intl?.formatMessage({ id: "common.shortYear" });
  const shortMonthSuffix = intl?.formatMessage({ id: "common.shortMonth" });

  switch (valueType) {
    case EValueToFormatType.currency:
      return formatCurrency(value as string);
    case EValueToFormatType.dateY:
      if (!value) return shortYearSuffix;
      return `${value} ${shortYearSuffix}`;

    case EValueToFormatType.dateYM:
      if (!value) return shortYearSuffix;
      const years = Math.floor((value as number) / 12);
      const months = (value as number) % 12;
      return months > 0
        ? `${years} ${shortYearSuffix} ${months} ${shortMonthSuffix}`
        : `${years} ${shortYearSuffix}`;

    case EValueToFormatType.percent:
      if (!value) return "%";
      return `${value}%`;

    default:
      return value as ReactNode;
  }
};
