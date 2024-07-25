import { ProductGuid } from "../../features/Products/types";
import {
  ICoverLimits,
  ICoversLimits,
  IProductConfig,
  IProductCover,
} from "../../models/common";
import { IProductCoversLimits } from "slices/productCoversLimits";

export const mapProductsConfigToProductCoversLimits = (
  productsConfig: IProductConfig[]
): IProductCoversLimits =>
  productsConfig.reduce<IProductCoversLimits>((acc, productConfig) => {
    acc[productConfig.product_guid] = mapProductCoversToCoversLimits(
      productConfig.product_guid,
      productConfig.product_covers
    );
    return acc;
  }, {});

const mapProductCoversToCoversLimits = (
  productGuid: number,
  productCovers: IProductCover[]
): ICoversLimits =>
  productCovers.reduce<ICoversLimits>((acc, productCover) => {
    acc[productCover.cover_code] = {
      addSumAssured: {
        min: toNumberOrUndefined(productCover.cover_min_add_sum_assured),
        max: toNumberOrUndefined(productCover.cover_max_add_sum_assured),
      },
      duration: {
        min: toNumberOrUndefined(productCover.cover_min_duration),
        max: toNumberOrUndefined(productCover.cover_max_duration),
      },
      expMatBen: {
        min: toNumberOrUndefined(productCover.cover_min_exp_mat_ben),
        max: toNumberOrUndefined(productCover.cover_max_exp_mat_ben),
      },
      payments: {
        min: toNumberOrUndefined(productCover.cover_min_payments),
        max: toNumberOrUndefined(productCover.cover_max_payments),
      },
      premium: {
        min: toNumberOrUndefined(productCover.cover_min_premium),
        max: toNumberOrUndefined(productCover.cover_max_premium),
      },
      sumAssured: {
        min: toNumberOrUndefined(productCover.cover_min_sum_assured),
        max: toNumberOrUndefined(productCover.cover_max_sum_assured),
      },
      sumOfPremiums: {
        max: toNumberOrUndefined(productCover.cover_max_sum_of_premiums),
      },
      insuredAge: {
        min: toNumberOrUndefined(productCover.min_age_insured_months),
        max: toNumberOrUndefined(productCover.max_age_atentry_insured_months),
      },
      policyHolderAge: {
        min: 216,
      },
      multiplicity: calculateMultiplicity(productGuid, productCover.cover_code),
    };
    return acc;
  }, {});

export const toNumberOrUndefined = (
  value: string | number | null
): number | undefined =>
  value !== null
    ? Number.isNaN(Number(value))
      ? undefined
      : Number(value)
    : undefined;

export enum SumAssuredMultiplicity {
  Multiplicity1000 = 1000,
  Multiplicity500 = 500,
  Multiplicity100 = 100,
  Multiplicity1 = 1,
}

export const calculateMultiplicity = (
  productGuid: number,
  coverCode: string
) => {
  switch (productGuid) {
    case ProductGuid.Start:
      switch (coverCode) {
        case "TPDISCH":
        case "CICHILD":
          // case 'PRUCHILD': // PRUCHILD is validated in different place
          return SumAssuredMultiplicity.Multiplicity500;
        case "HRC":
          return SumAssuredMultiplicity.Multiplicity100;
        default:
          return SumAssuredMultiplicity.Multiplicity1000;
      }
    case ProductGuid.Comfort:
      switch (coverCode) {
        case "HRA":
        case "HRC":
          return SumAssuredMultiplicity.Multiplicity100;
        default:
          return SumAssuredMultiplicity.Multiplicity1000;
      }
    case ProductGuid.Savings:
    case ProductGuid.Retirement:
      switch (coverCode) {
        case "HRA":
          return SumAssuredMultiplicity.Multiplicity100;
        default:
          return SumAssuredMultiplicity.Multiplicity1000;
      }
    default:
      return SumAssuredMultiplicity.Multiplicity1000;
  }
};

export const emptyCoverLimits: ICoverLimits = {
  addSumAssured: {},
  duration: {},
  expMatBen: {},
  payments: {},
  premium: {},
  sumAssured: {},
  sumOfPremiums: {},
  insuredAge: {},
  policyHolderAge: {},
};
