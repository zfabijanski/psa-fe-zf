import { FormikErrors } from "formik";
import { get } from "lodash";
import { ValidationErrorType } from "../models/common";
import { flatObject } from "./object";

export const getFieldName = (name: string): string => {
  const names = name.split(".");
  return names.length > 0 ? names[names.length - 1] : "";
};

export const someRequiredFieldsNotFilled = <T extends {}>(
  errors: FormikErrors<T>
) => {
  const flatErrors: { [key: string]: ValidationErrorType } = {};
  flatObject(errors, flatErrors);
  return Object.keys(flatErrors).some(
    (key) => flatErrors[key] === ValidationErrorType.Required
  );
};

export const hasFundContributionError = <T extends {}>(errors: T) => {
  return (
    get(errors, "fundContributions", "") ===
    ValidationErrorType.PercentageIsNot100
  );
};

export const hasRopOptionError = <T extends {}>(errors: T) => {
  return !!get(errors, "ropOption", "");
};
