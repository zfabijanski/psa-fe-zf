import { array, lazy, mixed, object, Schema } from "yup";
import {
  ICoversLimits,
  IMinMax,
  IProductFund,
  ProductCategory,
} from "../../../models/common";

import { YesNo } from "models/calculator";
import { ICalculationVM, ICoversConfigMap } from "../types";
import { getCoverSchema, getWopCoverSchema } from "./coverSchema";
import { getFundContributionsSchema } from "./fundContributionsSchema";
import { getInsuredSchema } from "./insuredSchema";
import { getPolicyHolderSchema } from "./policyHolderSchema";

type CalculationValidatedFields = Pick<
  ICalculationVM,
  | "policyHolderIsMainInsured"
  | "mainInsured"
  | "policyHolder"
  | "ropOption"
  | "additionalLifeAssureds"
  | "mainCover"
  | "additionalCovers"
  | "wopCovers"
  | "frequencyCode"
  | "fundContributions"
>;

const getAdditionalInsuredAgeLimits = (
  coversConfig: ICoversConfigMap,
  coversLimits: ICoversLimits
): IMinMax => {
  let min: number | undefined;
  let max: number | undefined;
  Object.keys(coversLimits)
    .filter((coverCode) => coversConfig[coverCode].isChild)
    .forEach((coverCode) => {
      const coverLimits = coversLimits[coverCode];
      if (
        coverLimits.insuredAge.min &&
        (!min || coverLimits.insuredAge.min < min)
      ) {
        min = coverLimits.insuredAge.min;
      }
      if (
        coverLimits.insuredAge.max &&
        (!max || coverLimits.insuredAge.max > max)
      ) {
        max = coverLimits.insuredAge.max;
      }
    });
  return { min, max };
};

const getStrictAgeLimit = (minMaxArray: IMinMax[]): IMinMax => {
  const min = Math.max(...minMaxArray.map((x) => x.min!).filter(Boolean));
  const max = Math.min(...minMaxArray.map((x) => x.max!).filter(Boolean));

  return {
    min,
    max,
  };
};

export const getValidationSchema = (
  productCategories: ProductCategory[],
  coversLimits: ICoversLimits,
  coversConfig: ICoversConfigMap,
  productGuid: number,
  productFunds: IProductFund[]
) =>
  lazy(
    ({
      frequencyCode,
      mainCover,
      mainInsured,
      policyHolder,
    }: CalculationValidatedFields): Schema<CalculationValidatedFields> => {
      const getCoverSchemaForInsured = (
        insuredDateOfBirth?: string,
        isMain?: boolean
      ) =>
        getCoverSchema(
          productCategories,
          coversLimits,
          coversConfig,
          frequencyCode,
          mainCover!.duration,
          insuredDateOfBirth,
          isMain
        );

      return object().shape({
        mainInsured: mixed().when("policyHolderIsMainInsured", {
          is: YesNo.Yes,
          then: getInsuredSchema(
            getCoverSchemaForInsured,
            getStrictAgeLimit([
              coversLimits[mainCover.code].policyHolderAge,
              coversLimits[mainCover.code].insuredAge,
            ])
          ),
          otherwise: getInsuredSchema(
            getCoverSchemaForInsured,
            coversLimits[mainCover.code].insuredAge
          ),
        }),
        policyHolder: mixed().when("policyHolderIsMainInsured", {
          is: YesNo.Yes,
          then: mixed().notRequired(),
          otherwise: getPolicyHolderSchema(
            getCoverSchemaForInsured,
            coversLimits[mainCover.code].policyHolderAge
          ),
        }),
        ropOption: mixed<YesNo.Yes | YesNo.No | undefined>(),
        additionalLifeAssureds: array().of(
          getInsuredSchema(
            getCoverSchemaForInsured,
            getAdditionalInsuredAgeLimits(coversConfig, coversLimits)
          )
        ),
        mainCover: getCoverSchemaForInsured(mainInsured.dateOfBirth, true),
        additionalCovers: array().of(
          getCoverSchemaForInsured(mainInsured.dateOfBirth)
        ),
        wopCovers: array().of(
          getWopCoverSchema(
            coversLimits,
            productCategories.includes(ProductCategory.Child)
              ? policyHolder.dateOfBirth
              : mainInsured.dateOfBirth,
            productGuid
          )
        ),
        fundContributions: getFundContributionsSchema(productFunds || []),
      });
    }
  );
