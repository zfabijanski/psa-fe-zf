import { FormikActions, FormikState } from "formik";
import { Frequency, ICoverLimits } from "../../../models/common";
import { IErrorMessageResolver } from "../errorMessageResolver";
import { ICalculationVM, ICover } from "../types";
import { IFieldsConfig } from "./config";

export interface IFieldsProps
  extends Pick<FormikActions<ICalculationVM>, "setFieldValue">,
    Pick<FormikState<ICover>, "errors" | "values"> {
  fieldsConfig: IFieldsConfig;
  outdatedFields: string[];
  name: string;
  resolveErrorMessage: IErrorMessageResolver;
  coverLimits: ICoverLimits;
  frequencyCode?: Frequency;
}
