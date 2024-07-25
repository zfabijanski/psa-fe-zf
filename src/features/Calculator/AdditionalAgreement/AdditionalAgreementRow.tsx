import React from "react";
import { useIntl } from "react-intl";
import styled from "styled-components";
import {
  DurationSelect,
  getDurationResolveParameter,
} from "../../../components/UI/DurationSelect";
import { DataEntryMode } from "../../../components/UI/helpersUI";
import { ICoverLimits } from "../../../models/common";
import { YesNo } from "models/calculator";
import { CoverCategory } from "slices/coversConfig";
import { getFieldName } from "../../../utils/formHelpers";
import { CalculatorColWrapper } from "../components/CalculatorColWrapper";
import { CalculatorCoverCheckbox } from "../components/CalculatorCoverCheckbox";
import { CalculatorCurrencyInput } from "../components/CalculatorCurrencyInput";
import { GridRow } from "../components/CalculatorGrid";
import CoverWrapper from "../CoverWrapper";
import { ICoverProps } from "../CoverWrapper/CoverWrapper";
import {
  getTrKeysFromDescriptor,
  IErrorMessageResolver,
} from "../errorMessageResolver";
import { ValueType } from "../types";
import { roundToDecimals } from "utils/transformers";

const RowWrapper = styled(GridRow)`
  padding: 6px 0;
  align-items: flex-start;
`;

const ColWrapper = styled(CalculatorColWrapper)`
  display: flex;
  align-items: center;
  flex-direction: column;
  & > label {
    width: 100%;
  }
`;

interface IProps extends ICoverProps {
  coverName: string;
  coverCode: string;
  isHospital: boolean;
  monthsEnabled?: boolean;
  coverLimits: ICoverLimits;
  resolveErrorMessage: IErrorMessageResolver;
}

export const AdditionalAgreementRow: React.FC<IProps> = ({
  values,
  errors,
  coverName,
  coverCode,
  isHospital,
  setFieldValue,
  name,
  monthsEnabled,
  coverLimits,
  frequencyCode,
  resolveErrorMessage,
  ...rest
}) => {
  const intl = useIntl();

  const handleValueChange = (key: string, value?: ValueType) => {
    if (
      isHospital &&
      getFieldName(key) === "sumAssured" &&
      typeof value === "number"
    ) {
      setFieldValue(
        `${name}.addSumAssured`,
        value ? roundToDecimals(value / 100) : undefined
      );
    } else if (
      isHospital &&
      getFieldName(key) === "addSumAssured" &&
      typeof value === "number"
    ) {
      setFieldValue(
        `${name}.sumAssured`,
        value ? Math.round(value * 100) : undefined
      );
    }
    setFieldValue(`${name}.checked`, YesNo.Yes);
    if (
      coverLimits.duration.min === coverLimits.duration.max &&
      values.checked === YesNo.No
    ) {
      setFieldValue(`${name}.duration`, coverLimits.duration.min);
    }
  };

  const handleCheckboxChange = (key: string, value?: YesNo | null) => {
    setFieldValue(key, value);
    if (value === YesNo.No) {
      setFieldValue(key, value);
      [
        "sumAssured",
        "addSumAssured",
        "premiumPerFreq",
        "duration",
        "directionOfCalculation",
      ].forEach((fieldName) =>
        setFieldValue(`${name}.${fieldName}`, undefined)
      );
    } else {
      if (
        coverLimits.duration.min === coverLimits.duration.max &&
        values.checked === YesNo.No
      ) {
        setFieldValue(`${name}.duration`, coverLimits.duration.min);
      }
    }
  };

  const renderComponent = (
    outdatedFields: string[],
    handleSetFieldValue: (key: string, value: ValueType) => void
  ) => (
    <RowWrapper>
      <CalculatorColWrapper span={7} alignWithDoubleField={isHospital}>
        <CalculatorCoverCheckbox
          name={`${name}.checked`}
          mode={DataEntryMode.Gray}
          value={values.checked || null}
          error={errors.checked}
          resolveErrorMessage={resolveErrorMessage}
          onSetFieldValue={handleCheckboxChange}
          mainInsuredAgeMinMax={coverLimits.insuredAge}
          coverName={coverName}
          coverCode={coverCode}
        />
      </CalculatorColWrapper>
      <ColWrapper span={3}>
        <CalculatorCurrencyInput
          mode={DataEntryMode.White}
          name={`${name}.sumAssured`}
          value={values.sumAssured}
          error={errors.sumAssured}
          placeholder={
            isHospital
              ? intl.formatMessage({
                  id: "calculator.additionalAgreements.addSumAssured.placeholder",
                })
              : undefined
          }
          filledDesc={
            isHospital
              ? intl.formatMessage({
                  id: "calculator.additionalAgreements.addSumAssured.filledDesc",
                })
              : undefined
          }
          outOfDate={outdatedFields.includes("sumAssured")}
          onSetFieldValue={handleSetFieldValue}
          resolveErrorMessage={resolveErrorMessage}
          min={coverLimits.sumAssured.min}
          max={coverLimits.sumAssured.max}
          hideValidationMessage={!!isHospital}
          fractional
        />
        {isHospital && (
          <CalculatorCurrencyInput
            mode={DataEntryMode.White}
            name={`${name}.addSumAssured`}
            value={values.addSumAssured}
            error={errors.addSumAssured}
            overrideValidation={{
              error: errors.sumAssured,
              name: `${name}.sumAssured`,
              min: coverLimits.sumAssured.min,
              max: coverLimits.sumAssured.max,
            }}
            placeholder={intl.formatMessage({
              id: "calculator.additionalAgreements.addSumAssured.hospital.placeholder",
            })}
            filledDesc={intl.formatMessage({
              id: "calculator.additionalAgreements.addSumAssured.hospital.filledDesc",
            })}
            outOfDate={outdatedFields.includes("addSumAssured")}
            onSetFieldValue={handleSetFieldValue}
            resolveErrorMessage={resolveErrorMessage}
            min={coverLimits.addSumAssured.min}
            max={coverLimits.addSumAssured.max}
            fractional
          />
        )}
      </ColWrapper>
      <CalculatorColWrapper span={3} alignWithDoubleField={isHospital}>
        <DurationSelect
          value={values.duration || 0}
          labelProps={{
            validationInfoTrKeys: errors.duration
              ? getTrKeysFromDescriptor(
                  resolveErrorMessage(
                    errors.duration,
                    `${name}.duration`,
                    getDurationResolveParameter(
                      coverLimits.duration.min || 0,
                      coverLimits.duration.max || 1200,
                      true
                    )
                  )
                )
              : [],
          }}
          isInvalid={!!errors.duration}
          onChange={(value) => handleSetFieldValue(`${name}.duration`, value)}
          onBlur={() => {}}
          minMaxParamsInMonths={true}
          showMonths={monthsEnabled}
          minValue={coverLimits.duration.min || 0}
          maxValue={coverLimits.duration.max || 1200}
          valueInMonths={true}
        />
      </CalculatorColWrapper>
      <CalculatorColWrapper span={3} alignWithDoubleField={isHospital}>
        <CalculatorCurrencyInput
          name={`${name}.premiumPerFreq`}
          value={values.premiumPerFreq}
          error={errors.premiumPerFreq}
          resolveErrorMessage={resolveErrorMessage}
          outOfDate={outdatedFields.includes("premiumPerFreq")}
          onSetFieldValue={handleSetFieldValue}
          mode={DataEntryMode.White}
          min={coverLimits.premium.min}
          max={coverLimits.premium.max}
          frequency={frequencyCode}
          fractional
        />
      </CalculatorColWrapper>
    </RowWrapper>
  );

  return (
    <CoverWrapper
      coverMainCategory={CoverCategory.Additional}
      values={values}
      name={name}
      setFieldValue={setFieldValue}
      handleValueChange={handleValueChange}
      isHospital={isHospital}
      {...rest}
      renderComponent={renderComponent}
    />
  );
};
