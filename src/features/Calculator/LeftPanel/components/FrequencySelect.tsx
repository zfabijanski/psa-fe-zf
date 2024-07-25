import { FormikActions, FormikState } from "formik";
import React from "react";
import { Select } from "../../../../components/UI/Select";
import { Frequency } from "../../../../models/common";
import { ICalculationVM } from "../../types";

interface IProps
  extends Pick<FormikActions<ICalculationVM>, "setFieldValue">,
    Pick<FormikState<ICalculationVM>, "values"> {
  productFrequencies?: Frequency[];
}

export const FrequencySelect: React.FC<IProps> = ({
  values,
  setFieldValue,
  productFrequencies,
}) => {
  return (
    <Select
      value={values.frequencyCode || ""}
      onChange={(value) => setFieldValue("frequencyCode", value)}
      labelProps={{ labelTrKey: "calculator.paymentFrequency" }}
      options={
        productFrequencies?.map((value) => ({
          value,
          labelTrKey: `calculator.contribution.${value}`,
        })) || []
      }
    />
  );
};
