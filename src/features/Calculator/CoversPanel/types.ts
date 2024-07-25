import { ProductCategory } from "../../../models/common";
import { ICalculationVM } from "../types";

export interface IProductOption {
  productName: string;
  productCategories: ProductCategory[];
  initialValues: ICalculationVM;
}
