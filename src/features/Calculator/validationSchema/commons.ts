import { number, NumberSchema, Schema, TestOptionsMessage } from "yup";
import { ValidationErrorType } from "../../../models/common";

export const getRequiredSchema = <
  T extends Schema<K> & { required(message?: TestOptionsMessage): T },
  K
>(
  schema: T
) => schema.required(ValidationErrorType.Required);

export const getMinSchema = (
  schema: NumberSchema = number(),
  min?: number,
  errorType: ValidationErrorType = ValidationErrorType.TooLow
): NumberSchema => (min ? schema.min(min, errorType) : schema);

export const getMaxSchema = (
  schema: NumberSchema = number(),
  max?: number,
  errorType: ValidationErrorType = ValidationErrorType.TooHigh
): NumberSchema => (max ? schema.max(max, errorType) : schema);
