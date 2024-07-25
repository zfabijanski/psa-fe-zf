import { FormikActions, FormikState } from "formik";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import styled from "styled-components";
import { TypoSubheader } from "../../../components/UI/typography";
import { emptyCoverLimits } from "mapper/productCoversLimits/productCoversLimits";
import { ICoversLimits } from "../../../models/common";
import { GridColumn, GridRow } from "../components/CalculatorGrid";
import { IErrorMessageResolver } from "../errorMessageResolver";
import { ICalculationVM, ICover, ICoversConfigMap } from "../types";
import { AdditionalAgreementFillRow } from "./AdditionalAgreementFillRow";

interface IProps
  extends Pick<FormikActions<ICalculationVM>, "setFieldValue">,
    Pick<FormikState<ICover[]>, "errors" | "values"> {
  name: string;
  coversConfigMap: ICoversConfigMap;
  coversLimits: ICoversLimits;
  resolveErrorMessage?: IErrorMessageResolver;
}

const HeaderCol = styled(TypoSubheader)`
  margin-bottom: 10px;
  color: ${({ theme }) => theme.newColors.primaryDark};
`;

export const AdditionalAgreementFill: React.FC<IProps> = ({
  values,
  errors,
  coversConfigMap,
  name,
  coversLimits,
  ...rest
}) => {
  const intl = useIntl();
  return (
    <>
      <GridRow>
        <GridColumn span={10}>
          <HeaderCol>
            <FormattedMessage id="calculator.additionalContractsTakingOver" />
          </HeaderCol>
        </GridColumn>
        <GridColumn span={3} />
        <GridColumn span={3}>
          <HeaderCol>
            <FormattedMessage id="calculator.additionalContribution" />
          </HeaderCol>
        </GridColumn>
      </GridRow>
      {values.map((cover, index) => (
        <AdditionalAgreementFillRow
          {...rest}
          key={`${name}[${index}]`}
          values={cover}
          errors={errors[index] || {}}
          coverName={intl.formatMessage({
            id: `calculator.cover.${cover.code}`,
          })}
          name={`${name}[${index}]`}
          coverLimits={coversLimits[cover.code] || emptyCoverLimits}
        />
      ))}
    </>
  );
};
