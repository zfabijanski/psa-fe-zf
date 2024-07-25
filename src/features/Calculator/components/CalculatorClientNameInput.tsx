import React, { useEffect, useState } from "react";
import { IDataEntry } from "../../../components/UI/helpersUI";
import {
  getTextFromMixed,
  Input,
  IInputProps,
} from "../../../components/UI/Input";
import { capitalizeFirst } from "../../../utils/formatters";
import { isFirstNameValid } from "../../../utils/validationRules";
import {
  getTrKeysFromDescriptor,
  IErrorMessageResolver,
} from "../errorMessageResolver";

interface IProps extends Omit<IInputProps, "onChange">, IDataEntry {
  name: string;
  onSetFieldValue: (name: string, value: string) => void;
  resolveErrorMessage: IErrorMessageResolver;
}

const parse = (newValue: string, oldValue: string) =>
  isFirstNameValid(newValue) ? newValue : oldValue;

export const CalculatorClientNameInput: React.FC<IProps> = ({
  name,
  error,
  onSetFieldValue,
  placeholder,
  resolveErrorMessage,
  ...props
}) => {
  const [value, setValue] = useState<string>(props.value || "");

  useEffect(() => {
    setValue(props.value || "");
  }, [props.value]);

  const handleInputChange = (value: string) => {
    const valueTrimmed = value.trim();
    setValue(valueTrimmed ? parse(valueTrimmed, value) : valueTrimmed);
  };

  const handleInputBlur = (value: string) => {
    const valueTrimmed = value.trim();
    onSetFieldValue(name, capitalizeFirst(valueTrimmed));
  };

  return (
    <Input
      allowedSignsRegex="^[-'\s\p{L}]{0,64}$"
      value={value}
      onChange={handleInputChange}
      onBlur={handleInputBlur}
      labelProps={{
        validationInfoTrKeys: error
          ? getTrKeysFromDescriptor(resolveErrorMessage(error, name))
          : [],
        ...props.labelProps,
      }}
      isInvalid={!!error}
      placeholder={getTextFromMixed(placeholder)}
    />
  );
};
