import React, { useCallback } from "react";
import { IDataEntry } from "../../../components/UI/helpersUI";
import { ILabelProps } from "../../../components/UI/Label";
import PruCheckbox, {
  ICheckboxProps,
} from "../../../components/UI/PruCheckbox/PruCheckbox";
import { YesNo } from "models/calculator";
import { parseCheckboxValue } from "../../../utils/parseCheckboxValue";
import { IErrorMessageResolver } from "../errorMessageResolver";

export interface ICalculatorCheckboxProps extends ICheckboxProps, IDataEntry {
  name?: string;
  value: YesNo.Yes | YesNo.No | null;
  onSetFieldValue?: (name: string, value: YesNo | null) => void;
  readOnly?: boolean;
  resolveErrorMessage?: IErrorMessageResolver;
  labelProps?: ILabelProps;
}

export const CalculatorCheckbox: React.FC<ICalculatorCheckboxProps> = ({
  name,
  onSetFieldValue,
  value,
  readOnly,
  error,
  resolveErrorMessage,
  ...rest
}) => {
  const handleCheckboxChange = useCallback(
    (checked: boolean) => {
      if (name && onSetFieldValue) {
        onSetFieldValue(name, checked ? YesNo.Yes : YesNo.No);
      }
    },
    [name, onSetFieldValue]
  );

  return (
    <PruCheckbox
      {...rest}
      name={name}
      checked={parseCheckboxValue(value)}
      onChange={handleCheckboxChange}
      disabled={readOnly}
      isInvalid={!!error}
    />
  );
};
