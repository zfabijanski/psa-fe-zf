import { FormikActions, FormikState } from "formik";
import React from "react";
import { FormattedMessage, MessageDescriptor, useIntl } from "react-intl";
import styled from "styled-components";
import { emptyCoverLimits } from "mapper/productCoversLimits/productCoversLimits";
import { TypoSubheader } from "../../../components/UI/typography";
import { Frequency, ICoversLimits } from "../../../models/common";
import { GridColumn, GridRow } from "../components/CalculatorGrid";
import { IErrorMessageResolver } from "../errorMessageResolver";
import { ICalculationVM, ICover, ICoversConfigMap } from "../types";
import { AdditionalAgreementRow } from "./AdditionalAgreementRow";

interface IAgreementColumns {
  id?: string;
  span: number;
}

const getColumns = (
  firstColumnTitle: MessageDescriptor
): IAgreementColumns[] => [
  { ...firstColumnTitle, span: 7 },
  {
    id: "calculator.childAdditionalSumOfInsurance",
    span: 3,
  },
  {
    id: "calculator.additionalDuration",
    span: 3,
  },
  {
    id: "calculator.additionalContribution",
    span: 3,
  },
];

export interface IProps
  extends Pick<FormikActions<ICalculationVM>, "setFieldValue">,
    Pick<FormikState<ICover[]>, "errors" | "values"> {
  title: MessageDescriptor;
  name: string;
  coversConfigMap: ICoversConfigMap;
  monthsEnabled?: boolean;
  coversLimits: ICoversLimits;
  mainCoverDuration?: number;
  frequencyCode?: Frequency;
  resolveErrorMessage: IErrorMessageResolver;
}

const HeaderCol = styled(TypoSubheader)`
  margin-bottom: 10px;
  color: ${({ theme }) => theme.newColors.primaryDark};
`;

export const AdditionalAgreement: React.FC<IProps> = (props) => {
  const intl = useIntl();
  return (
    <>
      <GridRow>
        {getColumns(props.title).map((col) => (
          <GridColumn key={col.id} span={col.span}>
            <HeaderCol>
              <FormattedMessage id={col.id} />
            </HeaderCol>
          </GridColumn>
        ))}
      </GridRow>
      {props.values.map((cover, index) => (
        <AdditionalAgreementRow
          {...props}
          key={`${props.name}[${index}]`}
          values={cover}
          errors={props.errors[index] || {}}
          resolveErrorMessage={props.resolveErrorMessage}
          coverCode={cover.code}
          coverName={intl.formatMessage({
            id: `calculator.cover.${cover.code}`,
          })}
          isHospital={
            props.coversConfigMap[cover.code] &&
            props.coversConfigMap[cover.code].isHospital
          }
          name={`${props.name}[${index}]`}
          monthsEnabled={props.monthsEnabled}
          coverLimits={props.coversLimits[cover.code] || emptyCoverLimits}
        />
      ))}
    </>
  );
};
