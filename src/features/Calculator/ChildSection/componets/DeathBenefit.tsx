import { FormikActions } from "formik";
import React from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { DataEntryMode } from "../../../../components/UI/helpersUI";
import { TypoSubheader } from "../../../../components/UI/typography";
import { IMinMax } from "../../../../models/common";
import { YesNo } from "models/calculator";
import { CalculatorCheckbox } from "../../components";
import { CalculatorColWrapper } from "../../components/CalculatorColWrapper";
import { CalculatorCurrencyInput } from "../../components/CalculatorCurrencyInput";
import { GridColumn, GridRow } from "../../components/CalculatorGrid";
import { IErrorMessageResolver } from "../../errorMessageResolver";
import { ICalculationVM } from "../../types";

const HeaderColWrapper = styled(TypoSubheader)`
  margin-bottom: 10px;
  color: ${({ theme }) => theme.newColors.primaryDark};
`;

const DataRowWrapper = styled(GridRow)`
  padding: 10px 0;
  align-items: flex-start;
`;

interface IProps extends Pick<FormikActions<ICalculationVM>, "setFieldValue"> {
  value?: number;
  error?: string;
  resolveErrorMessage?: IErrorMessageResolver;
  name: string;
  minMax: IMinMax;
}

export const DeathBenefit: React.FC<IProps> = ({
  setFieldValue,
  minMax,
  ...props
}) => (
  <>
    <GridRow>
      <GridColumn span={7}>
        <HeaderColWrapper>
          <FormattedMessage id="calculator.contractsForChild" />
        </HeaderColWrapper>
      </GridColumn>
      <GridColumn span={3}>
        <HeaderColWrapper>
          <FormattedMessage id="calculator.childSumOfInsurance" />
        </HeaderColWrapper>
      </GridColumn>
    </GridRow>
    <DataRowWrapper>
      <GridColumn span={7}>
        <CalculatorCheckbox
          mode={DataEntryMode.Gray}
          value={YesNo.Yes}
          readOnly={true}
          labelProps={{ labelTrKey: "calculator.addSumAssured" }}
          checkboxType="calcTableItem"
        />
      </GridColumn>
      <CalculatorColWrapper span={3}>
        <CalculatorCurrencyInput
          {...props}
          mode={DataEntryMode.White}
          onSetFieldValue={setFieldValue}
          min={minMax.min}
          max={minMax.max}
          fractional
        />
      </CalculatorColWrapper>
    </DataRowWrapper>
  </>
);
