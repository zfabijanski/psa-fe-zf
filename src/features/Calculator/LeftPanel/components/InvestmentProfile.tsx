import { FormikActions } from "formik";
import React from "react";
import { RadioList } from "../../../../components/UI/RadioList";
import { InvestmentProfile as InvestmentProfileOption } from "../../../../models/common";
import { ICalculationVM } from "../../types";

interface IProps extends Pick<FormikActions<ICalculationVM>, "setFieldValue"> {
  value?: InvestmentProfileOption;
}

export const InvestmentProfile: React.FC<IProps> = ({
  value,
  setFieldValue,
}) => (
  <RadioList
    value={value}
    onChange={(value) => setFieldValue("investmentProfile", value)}
    labelProps={{ labelTrKey: "calculator.savingProfile" }}
    options={[
      {
        labelTrKey: "calculator.conservative",
        value: InvestmentProfileOption.Cautious,
      },
      {
        labelTrKey: "calculator.balanced",
        value: InvestmentProfileOption.Balanced,
      },
    ]}
  />
);
