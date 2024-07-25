import {
  lazy,
  mixed,
  MixedSchema,
  number,
  NumberSchema,
  object,
  Schema,
  string,
} from "yup";
import {
  Frequency,
  ICoversLimits,
  IMinMax,
  NonStandardFrequency,
  ProductCategory,
  ValidationErrorType,
} from "models/common";
import { Direction, YesNo } from "models/calculator";
import { ProductGuid } from "../../Products/types";
import { ICover, ICoversConfigMap } from "../types";
import { getMaxSchema, getMinSchema, getRequiredSchema } from "./commons";
import { isInsuredOldEnough, isInsuredYoungEnough } from "./insuredSchema";

export const FrequencyToMultiplier = {
  [Frequency.Monthly]: 1,
  [Frequency.Quarterly]: 3,
  [Frequency.SemiAnnually]: 6,
  [Frequency.Annually]: 12,
};

const getAdditionalCoverDurationSchema = (
  minMax: IMinMax,
  mainCoverDuration?: number,
  condition: (directionOfCalculation: Direction) => boolean = (direction) =>
    true
): NumberSchema<number | null> =>
  mainCoverDuration && (!minMax.max || mainCoverDuration < minMax.max)
    ? getMaxSchema(
        getMinSchema(getRequiredSchema(number()), minMax.min),
        mainCoverDuration,
        ValidationErrorType.AdditionalCoverDurationExceedsMainCover
      ).nullable()
    : getCoverValueSchema(minMax, condition);

const getCoverValueSchema = (
  minMax: IMinMax,
  condition: (directionOfCalculation: Direction) => boolean = (direction) =>
    true,
  addAdditionalValidation?: NumberSchema<number | null>
): NumberSchema => {
  const basicSchema = getMaxSchema(
    getMinSchema(getRequiredSchema(number()), minMax.min),
    minMax.max
  ).nullable();

  return number().when(["directionOfCalculation"], {
    is: (directionOfCalculation) =>
      !directionOfCalculation || condition(directionOfCalculation),
    then: addAdditionalValidation
      ? basicSchema.concat(addAdditionalValidation)
      : basicSchema,
    otherwise: number(),
  });
};

const getPremiumSchema = (
  minMax: IMinMax,
  frequency?: Frequency | NonStandardFrequency.None,
  condition: (directionOfCalculation: Direction) => boolean = (direction) =>
    true
): NumberSchema =>
  number().when(["directionOfCalculation"], {
    is: (directionOfCalculation) =>
      !directionOfCalculation || condition(directionOfCalculation),
    then: getMaxSchema(
      getMinSchema(
        getRequiredSchema(number()),
        frequency && frequency !== NonStandardFrequency.None && minMax.min
          ? FrequencyToMultiplier[frequency] * minMax.min
          : minMax.min
      ),
      frequency && frequency !== NonStandardFrequency.None && minMax.max
        ? Math.round(minMax.max / Number(frequency))
        : minMax.max
    ),
    otherwise: number(),
  });

const getErrorMessages = (productGuid?: number) => {
  if (productGuid === ProductGuid.Start) {
    return {
      tooYoung: ValidationErrorType.PolicyHolderTooYoung,
      tooOld: ValidationErrorType.PolicyHolderTooOld,
    };
  }
  return {
    tooYoung: ValidationErrorType.InsuredTooYoung,
    tooOld: ValidationErrorType.InsuredTooOld,
  };
};

const getCheckedSchema = (
  insuredAgeMinMax: IMinMax,
  insuredDateOfBirth?: string,
  productGuid?: number
): MixedSchema =>
  mixed<YesNo.Yes | YesNo.No | undefined>()
    .oneOf([YesNo.Yes, YesNo.No, undefined])
    .test("isInsuredOldEnough", getErrorMessages(productGuid).tooYoung, () =>
      isInsuredOldEnough(insuredAgeMinMax, insuredDateOfBirth)
    )
    .test("isInsuredYoungEnough", getErrorMessages(productGuid).tooOld, () =>
      isInsuredYoungEnough(insuredAgeMinMax, insuredDateOfBirth)
    );

const isInvestmentOrFunds = (productCategories: ProductCategory[]) =>
  productCategories.some(
    (category) =>
      ProductCategory.Investment === category ||
      ProductCategory.Funds === category
  );

export const getCoverSchema = (
  productCategories: ProductCategory[],
  coversLimits: ICoversLimits,
  coversConfig: ICoversConfigMap,
  frequencyCode?: Frequency,
  mainCoverDuration?: number,
  insuredDateOfBirth?: string,
  isMain?: boolean
): Schema<ICover> =>
  lazy(
    (value: ICover): Schema<ICover> =>
      value.checked === YesNo.Yes
        ? object().shape({
            checked: getCheckedSchema(
              coversLimits[value.code].insuredAge,
              insuredDateOfBirth
            ),
            directionOfCalculation: string(),
            sumAssured: getCoverValueSchema(
              coversLimits[value.code].sumAssured,
              (direction) => direction === Direction.SumAssuredToPremium,
              fractorialMultiplicitySchema
            ),
            premiumPerFreq: getPremiumSchema(
              coversLimits[value.code].premium,
              isInvestmentOrFunds(productCategories)
                ? NonStandardFrequency.None
                : frequencyCode,
              (direction) => direction === Direction.PremiumToSumAssured
            ).concat(
              isInvestmentOrFunds(productCategories)
                ? fractorialMultiplicitySchema
                : number()
            ),
            expMatBen: getCoverValueSchema(
              coversLimits[value.code].expMatBen,
              (direction) => direction === Direction.MaturityBenefitToPremium,
              fractorialMultiplicitySchema
            ),
            duration: isMain
              ? getCoverValueSchema(coversLimits[value.code].duration)
              : getAdditionalCoverDurationSchema(
                  coversLimits[value.code].duration,
                  mainCoverDuration
                ),
            payments:
              isMain && productCategories.includes(ProductCategory.Investment)
                ? getCoverValueSchema(coversLimits[value.code].payments)
                : mixed().notRequired(),
            addSumAssured:
              (isMain && productCategories.includes(ProductCategory.Child)) ||
              (coversConfig[value.code] || {}).isHospital
                ? getCoverValueSchema(
                    coversLimits[value.code].addSumAssured,
                    (direction) =>
                      (coversConfig[value.code] || {}).isHospital
                        ? direction === Direction.SumAssuredToPremium
                        : true,
                    value.code === "PRUCHILD"
                      ? fractorialMultiplicitySchema
                      : undefined
                  )
                : mixed().notRequired(),
            sumOfPremiums: productCategories.includes(
              ProductCategory.Investment
            )
              ? getCoverValueSchema(coversLimits[value.code].sumOfPremiums)
              : mixed().notRequired(),
          })
        : mixed().notRequired()
  );

export const getWopCoverSchema = (
  coversLimits: ICoversLimits,
  insuredDateOfBirth?: string,
  productGuid?: number
): Schema<Pick<ICover, "code" | "checked">> =>
  lazy(({ code, checked }: ICover) =>
    checked === YesNo.Yes
      ? object().shape({
          checked: getCheckedSchema(
            coversLimits[code].insuredAge,
            insuredDateOfBirth,
            productGuid
          ),
          code: string(),
        })
      : mixed().notRequired()
  );

const fractorialMultiplicitySchema: NumberSchema<number> = number().test(
  "fractorialMultiplicity",
  ValidationErrorType.FullPlnFormatRequired,
  (sumAssured) => (sumAssured ? sumAssured % 1 === 0 : true)
);
