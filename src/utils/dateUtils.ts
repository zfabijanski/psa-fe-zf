import { isDate } from "date-fns";
import dateFnsFormat from "date-fns/format";

export const mainDateValueFormat = "yyyy-MM-dd";
export const mainDateTimeValueFormat = "yyyy-MM-dd HH:mm";
export const mainDateDisplayFormat = "dd/MM/y";
export const mainDateTimeDisplayFormat = "dd/MM/y HH:mm";

const capitalize = (word: string) =>
  (word[0] || "").toUpperCase() + word.slice(1);

export const mapLocale =
  (
    locale: Locale,
    period: "day" | "month",
    width: "narrow" | "short" | "abbreviated" | "wide"
  ) =>
  (_: unknown, index: Number) =>
    (locale.localize &&
      capitalize(locale.localize[period](index, { width }))) ||
    "";

export const formatDateSafe = (date: string | Date, format: string) => {
  const realDate = isDate(date) ? (date as Date) : new Date(date);
  return dateFnsFormat(realDate, format);
};
