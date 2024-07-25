import React from "react";
import { ProductCategory } from "../../../../models/common";
import { YesNo } from "models/calculator";
import {
  InsuredsCheckbox,
  InsuredsComponent,
  LayoutItemFlex,
  RopOption,
} from "../components";
import { IProductsProps } from "../types";
import { Flex } from "components/UI/Box";

export const InvestmentProduct: React.FC<IProductsProps> = ({
  values,
  errors,
  resolveErrorMessage,
  setFieldValue,
  productCategories,
}) => {
  return (
    <>
      <InsuredsComponent
        values={values}
        setFieldValue={setFieldValue}
        errors={errors}
        resolveErrorMessage={resolveErrorMessage}
        childProduct={productCategories.includes(ProductCategory.Child)}
      />
      <LayoutItemFlex size={3}>
        <InsuredsCheckbox
          values={values}
          setFieldValue={setFieldValue}
          childProduct={productCategories.includes(ProductCategory.Child)}
        />
        {values.ropAvailable === YesNo.Yes && (
          <Flex>
            <RopOption
              value={values.ropOption}
              error={errors.ropOption}
              resolveErrorMessage={resolveErrorMessage}
              setFieldValue={setFieldValue}
            />
          </Flex>
        )}
      </LayoutItemFlex>
    </>
  );
};
