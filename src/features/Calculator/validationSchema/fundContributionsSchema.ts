import { sum, sumBy } from "lodash";
import { array, mixed, number, object, string } from "yup";
import { ValidationErrorType } from "../../../models/common";
import { IFundContribution } from "../types";

const ErrorMessages = {
  minimum10Percent: "MINIMUM_10_PERCENT",
  maximum100Percent: "MAXIMUM_100_PERCENT",
  percentageIsNot100: ValidationErrorType.PercentageIsNot100,
  required: ValidationErrorType.Required,
};

export const getFundContributionsSchema = (productFunds: unknown[]) =>
  productFunds.length
    ? array()
        .of(
          object().shape({
            funds: array().of(
              object().shape({
                allocationValue: number()
                  .transform((value) => (value === 0 ? value : value || null))
                  .test(
                    "number minimum 10",
                    ErrorMessages.minimum10Percent,
                    (value: number) => {
                      if (!value) {
                        return true;
                      }
                      return value >= 10;
                    }
                  )
                  .test(
                    "number maximum 100",
                    ErrorMessages.maximum100Percent,
                    (value: number) => {
                      if (!value) {
                        return true;
                      }
                      return value <= 100;
                    }
                  )
                  .test(
                    "filed is required but zero is accepted",
                    ErrorMessages.required,
                    (value: number) => {
                      if (value === 0) {
                        return true;
                      }
                      return !!value;
                    }
                  )
                  .nullable(true),
                guarantee: object().shape({
                  guaranteeValue: mixed().when("guaranteeChecked", {
                    is: true,
                    then: string().required(ErrorMessages.required),
                    otherwise: mixed(),
                  }),
                }),
              })
            ),
          })
        )
        .test(
          "is not 100%",
          ErrorMessages.percentageIsNot100,
          (value: IFundContribution[]) => {
            return (
              sum(value.map((x) => sumBy(x.funds, "allocationValue"))) === 100
            );
          }
        )
    : array().of(object());
