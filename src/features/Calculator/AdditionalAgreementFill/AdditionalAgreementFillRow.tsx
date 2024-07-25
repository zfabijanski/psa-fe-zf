import React from "react";
import styled from "styled-components";
import { DataEntryMode } from "../../../components/UI/helpersUI";
import { ICoverLimits } from "../../../models/common";
import { YesNo } from "models/calculator";
import { CoverCategory } from "slices/coversConfig";
import { CalculatorCheckbox } from "../components";
import { CalculatorCoverCheckbox } from "../components/CalculatorCoverCheckbox";
import { CalculatorCurrencyInput } from "../components/CalculatorCurrencyInput";
import { GridColumn, GridRow } from "../components/CalculatorGrid";
import CoverWrapper from "../CoverWrapper";
import { ICoverProps } from "../CoverWrapper/CoverWrapper";
import { IErrorMessageResolver } from "../errorMessageResolver";
import { ValueType } from "../types";

interface IProps extends ICoverProps {
  coverName: string;
  coverLimits: ICoverLimits;
  resolveErrorMessage?: IErrorMessageResolver;
}

const RowWrapper = styled(GridRow)`
  padding: 6px 0;
  align-items: flex-start;
`;

export const AdditionalAgreementFillRow: React.FC<IProps> = ({
  values,
  coverName,
  name,
  coverLimits,
  setFieldValue,
  errors,
  resolveErrorMessage,
  ...rest
}) => {
  const handleValueChange = (key: string, value: ValueType) => {
    setFieldValue(`${name}.checked`, YesNo.Yes);
  };

  const handleCheckboxChange = (key: string, value?: YesNo | null) => {
    setFieldValue(key, value);
    setFieldValue(`${name}.premiumPerFreq`, undefined);
    setFieldValue(`${name}.idxOption`, YesNo.No);
  };

  const renderComponent = (
    outdatedFields: string[],
    handleSetFieldValue: (key: string, value: ValueType) => void
  ) => (
    <RowWrapper>
      <GridColumn span={10}>
        <CalculatorCoverCheckbox
          name={`${name}.checked`}
          mode={DataEntryMode.Gray}
          onSetFieldValue={handleCheckboxChange}
          value={values.checked || null}
          error={errors.checked}
          resolveErrorMessage={resolveErrorMessage}
          mainInsuredAgeMinMax={coverLimits.insuredAge}
          coverName={coverName}
        />
      </GridColumn>
      <GridColumn span={3}>
        <CalculatorCheckbox
          name={`${name}.idxOption`}
          mode={DataEntryMode.Gray}
          onSetFieldValue={handleSetFieldValue}
          value={values.idxOption || null}
          labelProps={{ labelTrKey: "calculator.additionalIndexation" }}
          checkboxType="calcTableItem"
        />
      </GridColumn>
      <GridColumn span={3}>
        <CalculatorCurrencyInput
          readOnly={true}
          mode={DataEntryMode.White}
          value={values.premiumPerFreq}
          outOfDate={outdatedFields.includes("premiumPerFreq")}
          fractional
        />
      </GridColumn>
    </RowWrapper>
  );

  return (
    <CoverWrapper
      coverMainCategory={CoverCategory.WOP}
      values={values}
      name={name}
      setFieldValue={setFieldValue}
      handleValueChange={handleValueChange}
      {...rest}
      renderComponent={renderComponent}
    />
  );
};
