import { localizeNumber } from "./locale";

export const removeSeparator = (text: string): string =>
  text.split(/\s+/).join("");

type FormatNumberType = (
  value: string | number | undefined,
  formatOptions?: Intl.NumberFormatOptions
) => string;

export const formatNumber: FormatNumberType = (value, formatOptions) =>
  typeof value === "number"
    ? new Intl.NumberFormat("pl-PL", {
        ...formatOptions,
      }).format(value as number) // TS definitions are wrong (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/format#parameters)
    : "";

export const formatCurrency: FormatNumberType = (value, formatOptions) =>
  value
    ? formatNumber(localizeNumber(value), {
        style: "currency",
        currency: "PLN",
        ...formatOptions,
      })
    : "";

export const roundToDecimals = (value: number, decimals = 2): number =>
  Number(value.toFixed(decimals));
