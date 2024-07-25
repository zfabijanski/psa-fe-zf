import { array, lazy, object, Schema, string } from "yup";
import { IMinMax, ValidationErrorType } from "../../../models/common";
import { getAge } from "../../../utils/dateCalculations";
import { ICover, IInsured } from "../types";
import { getRequiredSchema } from "./commons";

export const getInsuredSchema = (
  getCoverSchema: (insuredDateOfBirth?: string) => Schema<ICover>,
  ageMinMax: IMinMax = {}
): Schema<IInsured> =>
  lazy(({ dateOfBirth }: IInsured) =>
    object().shape({
      insuredUuid: getRequiredSchema(string()),
      dateOfBirth: getRequiredSchema(string())
        .test(
          "isOldEnough",
          ValidationErrorType.InsuredTooYoung,
          (date?: string) => isInsuredOldEnough(ageMinMax, date)
        )
        .test(
          "isYoungEnough",
          ValidationErrorType.InsuredTooOld,
          (date?: string) => isInsuredYoungEnough(ageMinMax, date)
        ),
      covers: array().of(getCoverSchema(dateOfBirth)),
    })
  );

export const isInsuredOldEnough = (ageMinMax: IMinMax, date?: string) =>
  date && ageMinMax.min ? getAge(date, "months") >= ageMinMax.min : true;

export const isInsuredYoungEnough = (ageMinMax: IMinMax, date?: string) =>
  date && ageMinMax.max ? getAge(date, "months") < ageMinMax.max : true;
