import { IntlShape } from "react-intl";
import { ValidationErrorType } from "../../models/common";
import { TranslationMessages } from "slices/translations";
import { getFieldName } from "../../utils/formHelpers";
import { TranslationValue, WhiteSpace } from "../../utils/types";

interface IErrorMessageDescriptor {
  id: string;
  values?: Record<string, TranslationValue>;
}

export type IErrorMessageParamsResolver = (
  paramName: string
) => string | number | undefined;

export type IErrorMessageResolver = (
  error: string,
  fieldName: string,
  resolveParameter?: IErrorMessageParamsResolver,
  additionalPathParam?: string
) => IErrorMessageDescriptor | undefined;

const resolveErrorMessageId = (
  productGuid: number,
  fieldPath: string,
  error: string,
  trans: TranslationMessages,
  additionalPathParam?: string
) => {
  const fieldName = fieldPath.replace(/\[\d+\]/g, "");
  const sectionLevelMessageId = `calculator.validation.${productGuid}.${fieldName}.${error}`;
  if (trans[sectionLevelMessageId]) {
    return sectionLevelMessageId;
  }

  const productLevelMessageId = `calculator.validation.${productGuid}.${getFieldName(
    fieldPath
  )}.${error}`;
  if (trans[productLevelMessageId]) {
    return productLevelMessageId;
  }

  if (additionalPathParam) {
    const fieldAdditionalParamLevelMessageId = `calculator.validation.${fieldName}.${additionalPathParam}.${error}`;
    if (trans[fieldAdditionalParamLevelMessageId]) {
      return fieldAdditionalParamLevelMessageId;
    }
  }

  const fieldLevelMessageId = `calculator.validation.${fieldName}.${error}`;
  if (trans[fieldLevelMessageId]) {
    return fieldLevelMessageId;
  }

  return `calculator.validation.${getFieldName(fieldPath)}.${error}`;
};

export const extractPlaceholders = (message: string): string[] => {
  const regex = /\{(\w+)(?:\}|,)/g;
  const result = [];
  let match = regex.exec(message);

  while (match) {
    result.push(match[1]);
    match = regex.exec(message);
  }
  return result;
};

export const resolveErrorMessage =
  (
    productGuid: number,
    translations: TranslationMessages
  ): IErrorMessageResolver =>
  (
    error: string,
    fieldPath: string,
    resolveParameter?: IErrorMessageParamsResolver,
    additionalPathParam?: string
  ): IErrorMessageDescriptor | undefined => {
    if (error === ValidationErrorType.Required) {
      return { id: "calculator.validation.REQUIRED" };
    }

    const messageId = resolveErrorMessageId(
      productGuid,
      fieldPath,
      error,
      translations,
      additionalPathParam
    );

    const rawMessage = translations[messageId];
    if (!rawMessage) {
      return { id: messageId };
    }

    const placeholders = extractPlaceholders(rawMessage);
    if (!placeholders) {
      return { id: rawMessage };
    }

    if (!resolveParameter) {
      return { id: rawMessage };
    }

    const placeholderValues = placeholders.reduce<
      Record<string, TranslationValue>
    >((acc, placeholder) => {
      acc[placeholder] = resolveParameter(placeholder);
      return acc;
    }, {});

    return { id: messageId, values: placeholderValues };
  };

const injectNonBreakingSpace = (values?: IErrorMessageDescriptor["values"]) => {
  if (!values) return values;

  const affectedKeys = ["min", "max"];
  Object.entries(values).forEach(([key, value]) => {
    if (affectedKeys.includes(key) && typeof value === "string") {
      values[key] = value.replaceAll(" ", WhiteSpace.NonBreakingSpace);
    }
  });
  return values;
};

export const formatErrorMessage = (
  intl: IntlShape,
  errorMessageDescriptor?: IErrorMessageDescriptor
) => {
  if (!errorMessageDescriptor) {
    return undefined;
  }
  return intl.formatMessage(
    { id: errorMessageDescriptor.id },
    injectNonBreakingSpace(errorMessageDescriptor.values)
  ) as string;
};

export const getTrKeysFromDescriptor = (descriptor?: IErrorMessageDescriptor) =>
  descriptor && [
    {
      trKey: descriptor.id,
      values: descriptor.values,
    },
  ];
