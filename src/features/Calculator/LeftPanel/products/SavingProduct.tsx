import React from "react";
import { Frequency, ProductCategory } from "../../../../models/common";
import {
  FrequencySelect,
  Indexation,
  InsuredsCheckbox,
  InsuredsComponent,
  InvestmentProfile,
  LayoutItem,
  LayoutItemFlex,
  RopOption,
} from "../components";
import { IProductsProps } from "../types";
import { YesNo } from "models/calculator";

export const SavingProduct: React.FC<IProductsProps> = ({
  values,
  errors,
  resolveErrorMessage,
  setFieldValue,
  productCategories,
  productFrequencies,
}) => (
  <>
    <InsuredsComponent
      values={values}
      errors={errors}
      resolveErrorMessage={resolveErrorMessage}
      setFieldValue={setFieldValue}
      childProduct={productCategories.includes(ProductCategory.Child)}
    />
    <LayoutItemFlex size={3}>
      <InsuredsCheckbox
        values={values}
        setFieldValue={setFieldValue}
        childProduct={productCategories.includes(ProductCategory.Child)}
      />
      <Indexation value={values.indexation} setFieldValue={setFieldValue} />
    </LayoutItemFlex>
    <LayoutItem size={2}>
      <InvestmentProfile
        value={values.investmentProfile}
        setFieldValue={setFieldValue}
      />
    </LayoutItem>
    <LayoutItem size={3}>
      <FrequencySelect
        values={values}
        setFieldValue={setFieldValue}
        productFrequencies={productFrequencies as Frequency[]}
      />
    </LayoutItem>
    {values.ropAvailable === YesNo.Yes && (
      <LayoutItemFlex size={3}>
        <RopOption
          value={values.ropOption}
          error={errors.ropOption}
          resolveErrorMessage={resolveErrorMessage}
          setFieldValue={setFieldValue}
          labelTrKey="calculator.guaranteePremiumRefundLifetime"
        />
      </LayoutItemFlex>
    )}
  </>
);
