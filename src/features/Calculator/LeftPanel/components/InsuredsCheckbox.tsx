/* eslint-disable react-hooks/exhaustive-deps */
import { FormikActions, FormikState } from "formik";
import React from "react";
import styled from "styled-components";
import { DataEntryMode } from "../../../../components/UI/helpersUI";
import { YesNo } from "models/calculator";
import { CalculatorCheckbox } from "../../components";
import { ICalculationVM } from "../../types";

interface IProps
  extends Pick<FormikActions<ICalculationVM>, "setFieldValue">,
    Pick<FormikState<ICalculationVM>, "values"> {
  childProduct?: boolean;
}

const InformationDivWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const InsuredsCheckbox: React.FC<IProps> = ({
  values,
  childProduct,
  setFieldValue,
}) => {
  const handleCheckboxChange = (key: string, value?: YesNo | null) => {
    setFieldValue(key, value);
    if (value === YesNo.Yes) {
      setFieldValue("mainInsured", values.policyHolder);
      setFieldValue("policyHolder", { covers: [] });
    } else if (value === YesNo.No) {
      setFieldValue("policyHolder", values.mainInsured);
      setFieldValue("mainInsured", {
        insured_uuid: "",
        date_of_birth: "",
        covers: [],
      });
      (values.wopCovers || []).forEach((cover, index) => {
        setFieldValue(`wopCovers[${index}].checked`, YesNo.No);
        setFieldValue(`wopCovers[${index}].idxOption`, YesNo.No);
        setFieldValue(`wopCovers[${index}].premiumPerFreq`, undefined);
      });
    }
  };

  return (
    <InformationDivWrapper>
      <CalculatorCheckbox
        mode={DataEntryMode.White}
        value={
          values.policyHolderIsMainInsured === YesNo.Yes || childProduct
            ? YesNo.Yes
            : YesNo.No
        }
        readOnly={childProduct}
        onSetFieldValue={handleCheckboxChange}
        name={"policyHolderIsMainInsured"}
        labelProps={{
          labelTrKey: "calculator.policyholderIsInsured",
          modalContentTrKey: !!childProduct
            ? "calculator.policyholderIsInsured.tooltip"
            : undefined,
        }}
      />
    </InformationDivWrapper>
  );
};
