import React from "react";
import { InsuredsComponent } from "../components";
import { IProductsProps } from "../types";

export const FundsProduct: React.FC<IProductsProps> = ({
  values,
  errors,
  resolveErrorMessage,
  setFieldValue,
}) => {
  return (
    <InsuredsComponent
      values={values}
      setFieldValue={setFieldValue}
      errors={errors}
      resolveErrorMessage={resolveErrorMessage}
    />
  );
};
