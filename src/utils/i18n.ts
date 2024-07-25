import { MessageDescriptor, useIntl } from "react-intl";
import { SelectOption } from "../components/UI/Select";
import { TranslationValue } from "./types";

export const useI18n = () => {
  const intl = useIntl();

  const messageToString = (
    input: string | number | MessageDescriptor | undefined | null,
    values?: Record<string, TranslationValue>
  ) => {
    if (input === null || input === undefined) {
      return undefined;
    } else if (typeof input === "string" || typeof input === "number") {
      return input.toString();
    } else {
      return intl.formatMessage(input, values);
    }
  };

  const translateDropdownOptions = (
    labelIdPrefix: string,
    options: SelectOption[]
  ) =>
    options.map(({ value, text, ...rest }) => ({
      value,
      text: messageToString({
        id: `${labelIdPrefix}.${value}`,
      }),
      ...rest,
    }));

  return {
    ...intl,
    messageToString,
    translateDropdownOptions,
  };
};
