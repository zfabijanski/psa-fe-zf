import { FormikActions, FormikState } from "formik";
import React, { ReactNode } from "react";
import { useIntl } from "react-intl";
import styled from "styled-components";
import { DataEntryMode } from "../../../components/UI/helpersUI";
import PruButton from "../../../components/UI/PruButton/PruButton";
import { TypoH2 } from "../../../components/UI/typography";
import { Frequency, IMinMax } from "../../../models/common";
import AdditionalAgreement from "../AdditionalAgreement";
import { CalculatorClientNameInput, CalculatorDatepicker } from "../components";
import { CalculatorColWrapper } from "../components/CalculatorColWrapper";
import { GridRow } from "../components/CalculatorGrid";
import { IErrorMessageResolver } from "../errorMessageResolver";
import { ICalculationVM, IInsured } from "../types";
import { DeathBenefit } from "./componets/DeathBenefit";

const SingleChildDiv = styled.div`
  padding-bottom: 50px;

  &:last-child {
    padding-bottom: 0;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

const StyledCol = styled(CalculatorColWrapper)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

const Wrapper = styled.div`
  width: 100%;
`;

const CoversDiv = styled.div`
  padding-top: 30px;
`;

export interface IChildSectionProps
  extends Pick<FormikActions<ICalculationVM>, "setFieldValue">,
    Pick<FormikState<IInsured>, "errors" | "values"> {
  name: string;
  title: ReactNode;
  removeChild?: () => void;
  deathBenefitVisible?: boolean;
  deathBenefit?: number;
  deathBenefitError?: string;
  deathBenefitMinMax?: IMinMax;
  monthsEnabled?: boolean;
  frequencyCode?: Frequency;
  mainCoverCode?: string;
  mainCoverDuration?: number;
  resolveErrorMessage: IErrorMessageResolver;
}

export const ChildSection: React.FC<IChildSectionProps> = ({
  values,
  errors,
  resolveErrorMessage,
  name,
  title,
  removeChild,
  setFieldValue,
  deathBenefitVisible,
  deathBenefit,
  deathBenefitError,
  deathBenefitMinMax,
  mainCoverDuration,
  frequencyCode,
  monthsEnabled,
}) => {
  const intl = useIntl();
  return (
    <SingleChildDiv>
      <SectionHeader>
        <TypoH2>{title}</TypoH2>
        {removeChild && (
          <PruButton
            buttonType="secondary"
            size="medium"
            onClick={removeChild}
            icon="trash"
            iconPosition="right"
          >
            {intl.formatMessage({ id: "common.removeSection" })}
          </PruButton>
        )}
      </SectionHeader>
      <GridRow>
        <StyledCol span={7}>
          <Wrapper>
            <CalculatorClientNameInput
              labelProps={{
                labelTrKey: "calculator.nameOfChild",
              }}
              placeholder={intl.formatMessage({ id: "calculator.firstName" })}
              textAlign={"center"}
              value={values.insuredUuid ?? ""}
              error={errors.insuredUuid}
              name={`${name}.insuredUuid`}
              resolveErrorMessage={resolveErrorMessage}
              onSetFieldValue={setFieldValue}
            />
          </Wrapper>
          <CalculatorDatepicker
            label="calculator.childDateOfBirth"
            mode={DataEntryMode.White}
            value={values.dateOfBirth}
            error={errors.dateOfBirth}
            resolveErrorMessage={resolveErrorMessage}
            onSetFieldValue={setFieldValue}
            name={`${name}.dateOfBirth`}
          />
        </StyledCol>
      </GridRow>
      {deathBenefitVisible && (
        <CoversDiv>
          <DeathBenefit
            value={deathBenefit}
            error={deathBenefitError}
            resolveErrorMessage={resolveErrorMessage}
            name={"mainCover.addSumAssured"}
            setFieldValue={setFieldValue}
            minMax={deathBenefitMinMax || {}}
          />
        </CoversDiv>
      )}
      <CoversDiv>
        <AdditionalAgreement
          values={values.covers}
          errors={errors.covers || []}
          resolveErrorMessage={resolveErrorMessage}
          title={{ id: "calculator.additionalContractsForChild" }}
          setFieldValue={setFieldValue}
          name={`${name}.covers`}
          monthsEnabled={monthsEnabled}
          mainCoverDuration={mainCoverDuration}
          frequencyCode={frequencyCode}
        />
      </CoversDiv>
    </SingleChildDiv>
  );
};
