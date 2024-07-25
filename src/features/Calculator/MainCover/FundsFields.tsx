import React from "react";
import { CurrencyInput } from "./commons";
import { IFieldsProps } from "./types";

export const FundsFields: React.FC<IFieldsProps> = ({
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
