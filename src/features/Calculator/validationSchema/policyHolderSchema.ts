import { array, lazy, object, Schema, string } from "yup";
import { IMinMax, ValidationErrorType } from "../../../models/common";
import { getAge } from "../../../utils/dateCalculations";
import { ICover, IInsured } from "../types";
import { getRequiredSchema } from "./commons";

export const getPolicyHolderSchema = (
  getCoverSchema: () => Schema<ICover>,
  ageMinMax: IMinMax = {}
): Schema<IInsured> =>
  lazy(({ dateOfBirth }: IInsured) =>
    object().shape({
      insuredUuid: getRequiredSchema(string()),
      dateOfBirth: getRequiredSchema(string())
        .test(
          "isOldEnough",
          ValidationErrorType.PolicyHolderTooYoung,
          (date?: string) => isPolicyHolderOldEnough(ageMinMax, date)
        )
        .test(
          "isYoungEnough",
          ValidationErrorType.PolicyHolderTooOld,
          (date?: string) => isPolicyHolderYoungEnough(ageMinMax, date)
        ),
      covers: array().of(getCoverSchema()),
    })
  );

export const isPolicyHolderOldEnough = (ageMinMax: IMinMax, date?: string) =>
  date && ageMinMax.min ? getAge(date, "months") >= ageMinMax.min : true;

export const isPolicyHolderYoungEnough = (ageMinMax: IMinMax, date?: string) =>
  date && ageMinMax.max ? getAge(date, "months") < ageMinMax.max : true;
