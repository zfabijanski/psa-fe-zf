import React from "react";
import { useIntl } from "react-intl";
import styled from "styled-components";
import { TableSimple } from "../../../components/UI/TableSimple";
import { ProductCategory } from "../../../models/common";
import { CalculationStatus } from "models/calculator";
import { EValueToFormatType } from "../../../utils/formatValueUtils";
import { ICalculationVM } from "../types";

interface IProps {
  values: ICalculationVM;
  calculationStatus?: CalculationStatus;
}

const StyledTableSimple = styled(TableSimple)`
  margin-bottom: 80px;
`;

const oxygenRecords = [
  {
    id: "benefitValue",
    label: "calculator.survivalBenefitAfter85",
    size: 6,
  },
  {
    id: "benefitValue",
    label: "calculator.deathBenefit",
    size: 6,
  },
];

const capitalRecords = [
  {
    id: "guaranteedDeathBenefit",
    label: "calculator.insuranceSumDeath",
    size: 3,
    valueType: EValueToFormatType.currency,
  },
  {
    id: "sumAssured",
    label: "calculator.insuranceSumGuaranteed",
    modalContentTrKey: "calculator.insuranceSumGuaranteed.tooltip",
    size: 3,
    valueType: EValueToFormatType.currency,
  },
  {
    id: "guaranteedMaturityBenefit",
    label: "calculator.survivalBenefitGuaranteed",
    size: 3,
    valueType: EValueToFormatType.currency,
  },
  {
    id: "projectedMaturityValueEgrM",
    label: "calculator.survivalBenefitAnticipated",
    size: 3,
    valueType: EValueToFormatType.currency,
  },
];

export const MainCoverExtension: React.FC<IProps> = ({
  values,
  calculationStatus,
}) => {
  const intl = useIntl();

  if (values.productCategories.includes(ProductCategory.Funds)) {
    const { addSumAssured, expMatBen } = values.mainCover;
    const benefitValue =
      expMatBen && calculationStatus !== CalculationStatus.Invalid
        ? intl.formatMessage(
            { id: "calculator.benefitValue" },
            { expMatBen, addSumAssured }
          )
        : "";
    return (
      <StyledTableSimple
        fieldValues={{ benefitValue }}
        records={oxygenRecords}
      />
    );
  } else {
    const { sumAssured } = values.mainCover;
    return (
      <StyledTableSimple
        fieldValues={
          calculationStatus !== CalculationStatus.Invalid
            ? { ...values, sumAssured }
            : {}
        }
        records={capitalRecords}
      />
    );
  }
};
