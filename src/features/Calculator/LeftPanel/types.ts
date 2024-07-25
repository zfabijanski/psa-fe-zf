import { FormikActions, FormikState } from "formik";
import { Frequency, ProductCategory } from "../../../models/common";
import { IErrorMessageResolver } from "../errorMessageResolver";
import { ICalculationVM } from "../types";

export interface IProductsProps
  extends Pick<FormikActions<ICalculationVM>, "setFieldValue">,
    Pick<FormikState<ICalculationVM>, "errors" | "values"> {
  productCategories: ProductCategory[];
  productFrequencies?: Frequency[] | Array<"0">;
  resolveErrorMessage: IErrorMessageResolver;
}
