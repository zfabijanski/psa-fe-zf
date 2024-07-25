import React from "react";
import { DurationSelect } from "../../../components/UI/DurationSelect";
import { GridColumn } from "../components/CalculatorGrid";
import { getTrKeysFromDescriptor } from "../errorMessageResolver";
import { CurrencyInput } from "./commons";
import { IFieldsProps } from "./types";

export const InvestmentFields: React.FC<IFieldsProps> = ({
  fieldsConfig,
  setFieldValue,
  values,
  errors,
  resolveErrorMessage,
  name,
  coverLimits,
}) => (
  <>
    <CurrencyInput
      name={`${name}.premiumPerFreq`}
      value={values.premiumPerFreq}
      error={errors.premiumPerFreq}
      resolveErrorMessage={resolveErrorMessage}
      onSetFieldValue={setFieldValue}
      span={fieldsConfig.premium_per_freq.span}
      min={coverLimits.premium.min}
      max={coverLimits.premium.max}
      label={fieldsConfig.premium_per_freq.id}
      fractional
    />
    <GridColumn span={fieldsConfig.payments.span}>
      <DurationSelect
        value={values.payments || 0}
        labelProps={{
          labelTrKey: fieldsConfig.payments.id,
          validationInfoTrKeys: errors.payments
            ? getTrKeysFromDescriptor(
                resolveErrorMessage(errors.payments, `${name}.payments`)
              )
            : [],
        }}
        isInvalid={!!errors.payments}
        onChange={(value) => setFieldValue(`${name}.payments`, value)}
        onBlur={() => {}}
        minMaxParamsInMonths={false}
        showMonths={false}
        valueInMonths={false}
        minValue={coverLimits.payments.min!}
        maxValue={coverLimits.payments.max!}
        hasDarkBackground={true}
      />
    </GridColumn>
    <GridColumn span={fieldsConfig.duration.span}>
      <DurationSelect
        value={values.duration || 0}
        labelProps={{
          labelTrKey: fieldsConfig.duration.id,
          validationInfoTrKeys: errors.duration
            ? getTrKeysFromDescriptor(
                resolveErrorMessage(errors.duration, `${name}.duration`)
              )
            : [],
        }}
        isInvalid={!!errors.duration}
        onChange={(value) => setFieldValue(`${name}.duration`, value)}
        onBlur={() => {}}
        minMaxParamsInMonths={true}
        showMonths={false}
        valueInMonths={true}
        minValue={coverLimits.duration.min!}
        maxValue={coverLimits.duration.max!}
        hasDarkBackground={true}
      />
    </GridColumn>
    <CurrencyInput
      name={`${name}.sumOfPremiums`}
      value={values.sumOfPremiums}
      error={errors.sumOfPremiums}
      resolveErrorMessage={resolveErrorMessage}
      span={fieldsConfig.premium_sum.span}
      min={coverLimits.sumOfPremiums.min}
      max={coverLimits.sumOfPremiums.max}
      readOnly={true}
      label={fieldsConfig.premium_sum.id}
      fractional
    />
  </>
);
