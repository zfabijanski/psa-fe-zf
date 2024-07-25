import { FormikActions } from "formik";
import React from "react";
import { DataEntryMode } from "../../../../components/UI/helpersUI";
import { YesNo } from "models/calculator";
import { CalculatorCheckbox } from "../../components";
import { ICalculationVM } from "../../types";

interface IProps extends Pick<FormikActions<ICalculationVM>, "setFieldValue"> {
  value?: YesNo.Yes | YesNo.No | null;
}

export const Indexation: React.FC<IProps> = ({ value, setFieldValue }) => (
  <CalculatorCheckbox
    name={"indexation"}
    value={value || null}
    mode={DataEntryMode.White}
    onSetFieldValue={setFieldValue}
    labelProps={{ labelTrKey: "calculator.indexation" }}
    hideValidationInfo
  />
);
