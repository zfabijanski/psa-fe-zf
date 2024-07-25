import React, { useCallback } from "react";
import { IMinMax } from "../../../models/common";
import {
  getTrKeysFromDescriptor,
  IErrorMessageParamsResolver,
} from "../errorMessageResolver";
import {
  CalculatorCheckbox,
  ICalculatorCheckboxProps,
} from "./CalculatorCheckbox";

interface IProps extends ICalculatorCheckboxProps {
  mainInsuredAgeMinMax: IMinMax;
  coverName: string;
  coverCode?: string;
}

export const CalculatorCoverCheckbox: React.FC<IProps> = ({
  mainInsuredAgeMinMax,
  coverName,
  coverCode,
  ...rest
}) => {
  const resolveParameter = useCallback(
    (resolveParam?: IErrorMessageParamsResolver) => (paramName: string) => {
      switch (paramName) {
        case "maxInsuredAge":
          return calculateInsuredAge(mainInsuredAgeMinMax.max);
        case "minInsuredAge":
          return calculateInsuredAge(mainInsuredAgeMinMax.min);
      }
      return resolveParam && resolveParam(paramName);
    },
    [mainInsuredAgeMinMax]
  );

  const resolveErrorMessage = (
    err: string,
    fieldName: string,
    resolveParam?: IErrorMessageParamsResolver
  ) => {
    return (
      rest.resolveErrorMessage &&
      rest.resolveErrorMessage(
        err,
        fieldName,
        resolveParameter(resolveParam),
        coverCode
      )
    );
  };

  return (
    <CalculatorCheckbox
      {...rest}
      resolveErrorMessage={resolveErrorMessage}
      labelProps={{
        labelText: coverName,
        validationInfoTrKeys:
          rest.error && rest.name
            ? getTrKeysFromDescriptor(
                resolveErrorMessage(rest.error, rest.name)
              )
            : [],
      }}
      checkboxType="calcTableItem"
    />
  );
};

const calculateInsuredAge = (ageInMonths?: number) =>
  ageInMonths ? (ageInMonths < 12 ? ageInMonths : ageInMonths / 12) : undefined;
