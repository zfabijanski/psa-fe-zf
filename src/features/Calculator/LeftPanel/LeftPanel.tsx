import includes from "lodash/includes";
import React from "react";
import { InvestmentProfile, ProductCategory } from "../../../models/common";
import { YesNo } from "models/calculator";
import {
  FundsProduct,
  InvestmentProduct,
  ProtectiveProduct,
  SavingProduct,
} from "./products";
import { IProductsProps } from "./types";
import { LayoutWrapper } from "./components";

interface IProps extends IProductsProps {
  setCalculationFeatureChanged: (calculationId: number) => void;
}

export const LeftPanel: React.FC<IProps> = ({
  setFieldValue,
  setCalculationFeatureChanged,
  ...props
}) => {
  const handleSetFieldValue = (
    key: string,
    value: YesNo | InvestmentProfile
  ) => {
    if (props.values.calculationId) {
      setCalculationFeatureChanged(props.values.calculationId);
    }
    setFieldValue(key, value);
  };

  const renderComponent = (categories: string[]) => {
    if (includes(categories, ProductCategory.Investment)) {
      return (
        <InvestmentProduct setFieldValue={handleSetFieldValue} {...props} />
      );
    } else if (includes(categories, ProductCategory.Protective)) {
      return (
        <ProtectiveProduct setFieldValue={handleSetFieldValue} {...props} />
      );
    } else if (includes(categories, ProductCategory.Savings)) {
      return <SavingProduct setFieldValue={handleSetFieldValue} {...props} />;
    } else if (includes(categories, ProductCategory.Funds)) {
      return <FundsProduct setFieldValue={handleSetFieldValue} {...props} />;
    } else {
      return null;
    }
  };

  return (
    <LayoutWrapper>{renderComponent(props.productCategories)}</LayoutWrapper>
  );
};
