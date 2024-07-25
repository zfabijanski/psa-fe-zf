/* eslint-disable react-hooks/exhaustive-deps */
import { FormikActions, FormikState } from "formik";
import React from "react";
import { YesNo } from "models/calculator";
import { IErrorMessageResolver } from "../../errorMessageResolver";
import { ICalculationVM } from "../../types";
import { Person, PersonType } from "./Person";

interface IProps
  extends Pick<FormikActions<ICalculationVM>, "setFieldValue">,
    Pick<FormikState<ICalculationVM>, "errors" | "values"> {
  childProduct?: boolean;
  resolveErrorMessage: IErrorMessageResolver;
}

export const InsuredsComponent: React.FC<IProps> = ({
  values,
  errors,
  resolveErrorMessage,
  childProduct,
  setFieldValue,
}) => {
  if (values.policyHolderIsMainInsured === YesNo.Yes)
    return (
      <Person
        setFieldValue={setFieldValue}
        name={"mainInsured"}
        insured={values.mainInsured}
        errors={errors.mainInsured || {}}
        resolveErrorMessage={resolveErrorMessage}
        type={PersonType.MainInsuredAndPolicyHolder}
      />
    );
  if (childProduct)
    return (
      <Person
        setFieldValue={setFieldValue}
        name={"policyHolder"}
        insured={values.policyHolder}
        errors={errors.policyHolder || {}}
        resolveErrorMessage={resolveErrorMessage}
        type={PersonType.ChildPolicyHolder}
      />
    );

  return (
    <>
      <Person
        setFieldValue={setFieldValue}
        name={"policyHolder"}
        insured={values.policyHolder}
        errors={errors.policyHolder || {}}
        resolveErrorMessage={resolveErrorMessage}
        type={PersonType.PolicyHolder}
      />
      <Person
        setFieldValue={setFieldValue}
        name={"mainInsured"}
        insured={values.mainInsured}
        errors={errors.mainInsured || {}}
        resolveErrorMessage={resolveErrorMessage}
        type={PersonType.MainInsured}
      />
    </>
  );
};
