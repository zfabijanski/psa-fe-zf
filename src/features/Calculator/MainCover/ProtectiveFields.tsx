import React from "react";
import { DurationSelect } from "../../../components/UI/DurationSelect";
import { GridColumn } from "../components/CalculatorGrid";
import { getTrKeysFromDescriptor } from "../errorMessageResolver";
import { CurrencyInput } from "./commons";
import { IFieldsProps } from "./types";

export const ProtectiveFields: React.FC<IFieldsProps> = ({
  fieldsConfig,
  setFieldValue,
  values,
  errors,
  resolveErrorMessage,
  outdatedFields,
  name,
  frequencyCode,
  coverLimits,
}) => (
  <>
    <CurrencyInput
      name={`${name}.sumAssured`}
      value={values.sumAssured}
      error={errors.sumAssured}
      resolveErrorMessage={resolveErrorMessage}
      onSetFieldValue={setFieldValue}
      span={fieldsConfig.sum_assured.span}
      outOfDate={outdatedFields.includes("sumAssured")}
      min={coverLimits.sumAssured.min}
      max={coverLimits.sumAssured.max}
      label={fieldsConfig.sum_assured.id}
      fractional
    />
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
        showMonths={true}
        valueInMonths={true}
        minValue={coverLimits.duration.min!}
        maxValue={coverLimits.duration.max!}
        hasDarkBackground={true}
      />
    </GridColumn>
    <CurrencyInput
      name={`${name}.premiumPerFreq`}
      value={values.premiumPerFreq}
      error={errors.premiumPerFreq}
      resolveErrorMessage={resolveErrorMessage}
      onSetFieldValue={setFieldValue}
      span={fieldsConfig.premium_per_freq.span}
      outOfDate={outdatedFields.includes("premiumPerFreq")}
      min={coverLimits.premium.min}
      max={coverLimits.premium.max}
      frequency={frequencyCode}
      label={fieldsConfig.premium_per_freq.id}
      fractional
    />
  </>
);
