import { FormikActions, FormikState } from "formik";
import moment from "moment";
import * as React from "react";
import { useIntl } from "react-intl";
import { DataEntryMode } from "../../../../components/UI/helpersUI";
import {
  CalculatorClientNameInput,
  CalculatorDatepicker,
} from "../../components";
import { IErrorMessageResolver } from "../../errorMessageResolver";
import { ICalculationVM, IInsured } from "../../types";
import { LayoutItem } from "./Layout";

export enum PersonType {
  MainInsured = "MAIN",
  MainInsuredAndPolicyHolder = "MAIN_PH",
  PolicyHolder = "PH",
  ChildPolicyHolder = "CH_PH",
}

interface IProps
  extends Pick<FormikActions<ICalculationVM>, "setFieldValue">,
    Pick<FormikState<IInsured>, "errors"> {
  type: PersonType;
  insured: IInsured;
  name: string;
  resolveErrorMessage: IErrorMessageResolver;
}

const labelClientFirstName = {
  [PersonType.MainInsured]: {
    id: "calculator.insuredName",
  },
  [PersonType.MainInsuredAndPolicyHolder]: {
    id: "calculator.firstName",
  },
  [PersonType.PolicyHolder]: {
    id: "calculator.clientFirstName",
  },
  [PersonType.ChildPolicyHolder]: {
    id: "calculator.firstName",
  },
};

const labelDateOfBirth = {
  [PersonType.MainInsured]: {
    id: "calculator.dateOfBirth",
  },
  [PersonType.MainInsuredAndPolicyHolder]: {
    id: "calculator.dateOfBirth",
  },
  [PersonType.PolicyHolder]: {
    id: "calculator.insuredDateOfBirth",
  },
  [PersonType.ChildPolicyHolder]: {
    id: "calculator.dateOfBirth",
  },
};

export const Person: React.FC<IProps> = ({
  type,
  insured,
  errors,
  resolveErrorMessage,
  name,
  setFieldValue,
}) => {
  const intl = useIntl();
  return (
    <>
      <LayoutItem size={2}>
        <CalculatorClientNameInput
          value={insured.insuredUuid ?? ""}
          name={`${name}.insuredUuid`}
          onSetFieldValue={setFieldValue}
          textAlign="center"
          labelProps={{
            labelTrKey: labelClientFirstName[type]?.id,
          }}
          error={errors.insuredUuid}
          resolveErrorMessage={resolveErrorMessage}
        />
      </LayoutItem>
      <LayoutItem size={2}>
        <CalculatorDatepicker
          mode={DataEntryMode.White}
          value={insured.dateOfBirth}
          name={`${name}.dateOfBirth`}
          onSetFieldValue={setFieldValue}
          label={intl.formatMessage(labelDateOfBirth[type])}
          defaultPickerValue={
            type !== PersonType.MainInsured
              ? moment().subtract(18, "years")
              : undefined
          }
          error={errors.dateOfBirth}
          resolveErrorMessage={resolveErrorMessage}
        />
      </LayoutItem>
    </>
  );
};
