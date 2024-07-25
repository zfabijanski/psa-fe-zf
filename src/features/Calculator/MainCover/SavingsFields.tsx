import React from "react";
import { DurationSelect } from "../../../components/UI/DurationSelect";
import { GridColumn } from "../components/CalculatorGrid";
import { getTrKeysFromDescriptor } from "../errorMessageResolver";
import { CurrencyInput } from "./commons";
import { IFieldsProps } from "./types";
import { getTextFromMixed } from "../../../components/UI/Input";
import Overflower from "../../../components/Overflower";

export const SavingsFields: React.FC<IFieldsProps> = ({
  fieldsConfig,
  setFieldValue,
  values,
  errors,
  resolveErrorMessage,
  outdatedFields,
  name,
  coverLimits,
  frequencyCode,
}) => {
  // TODO: remove or propagate after deciding whether we should get rid of long/short text translations with overflower
  const getLabel = (id: string) => (
    <Overflower longText={{ id }} shortText={{ id: `${id}Short` }} />
  );

  return (
    <>
      <CurrencyInput
        name={`${name}.expMatBen`}
        value={values.expMatBen}
        error={errors.expMatBen}
        resolveErrorMessage={resolveErrorMessage}
        onSetFieldValue={setFieldValue}
        span={fieldsConfig.exp_mat_ben.span}
        outOfDate={outdatedFields.includes("expMatBen")}
        min={coverLimits.expMatBen.min}
        max={coverLimits.expMatBen.max}
        digitsLimit={8}
        labelNode={getLabel(fieldsConfig.exp_mat_ben.id)}
        fractional
      />
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
        digitsLimit={8}
        tooltip={getTextFromMixed(fieldsConfig.sum_assured.tooltip)}
        labelNode={getLabel(fieldsConfig.sum_assured.id)}
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
          showMonths={false}
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
        labelNode={getLabel(fieldsConfig.premium_per_freq.id)}
        fractional
      />
    </>
  );
};
