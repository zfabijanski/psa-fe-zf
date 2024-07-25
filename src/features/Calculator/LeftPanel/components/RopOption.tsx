import { FormikActions } from "formik";
import React from "react";
import { DataEntryMode } from "../../../../components/UI/helpersUI";
import { YesNo } from "models/calculator";
import { CalculatorCheckbox } from "../../components";
import { IErrorMessageResolver } from "../../errorMessageResolver";
import { ICalculationVM } from "../../types";
import { Box } from "components/UI/Box";

interface IProps extends Pick<FormikActions<ICalculationVM>, "setFieldValue"> {
  value?: YesNo.Yes | YesNo.No | null;
  error?: string;
  resolveErrorMessage?: IErrorMessageResolver;
  mainInsuredDateOfBirth?: string;
  labelTrKey?: string;
}

const SHOULD_SHOW_ERROR_MESSAGE = false;

export const RopOption: React.FC<IProps> = ({
  value,
  error,
  setFieldValue,
  resolveErrorMessage,
  labelTrKey = "calculator.guaranteePremiumRefund",
}) => {
  const showError = SHOULD_SHOW_ERROR_MESSAGE && !!error;
  const trKey = resolveErrorMessage?.(error!, "ropOption")?.id ?? "";

  return (
    <Box>
      <CalculatorCheckbox
        name={"ropOption"}
        value={value || null}
        onSetFieldValue={setFieldValue}
        mode={DataEntryMode.White}
        error={showError ? error : undefined}
        labelProps={{
          labelTrKey,
          validationInfoTrKeys: showError ? [{ trKey }] : [],
        }}
      />
    </Box>
  );
};
