import React from "react";
import { Frequency, ProductCategory } from "../../../../models/common";
import {
  FrequencySelect,
  Indexation,
  InsuredsCheckbox,
  InsuredsComponent,
  LayoutItem,
  LayoutItemFlex,
} from "../components";
import { IProductsProps } from "../types";

export const ProtectiveProduct: React.FC<IProductsProps> = ({
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
    <LayoutItem size={3}>
      <FrequencySelect
        values={values}
        setFieldValue={setFieldValue}
        productFrequencies={productFrequencies as Frequency[]}
      />
    </LayoutItem>
  </>
);
