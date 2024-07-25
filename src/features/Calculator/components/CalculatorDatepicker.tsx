import { Moment } from "moment";
import React, { useCallback, useMemo } from "react";
import { useIntl } from "react-intl";
import styled from "styled-components";
import { Datepicker } from "../../../components/UI/Datepicker";
import { DataEntryMode } from "../../../components/UI/helpersUI";
import {
  formatErrorMessage,
  IErrorMessageResolver,
} from "../errorMessageResolver";

interface IProps {
  label?: string;
  name: string;
  value?: string;
  mode?: DataEntryMode;
  onSetFieldValue: (name: string, value?: string) => void;
  defaultPickerValue?: Moment;
  error?: string;
  resolveErrorMessage?: IErrorMessageResolver;
}

const Wrapper = styled.div`
  width: 100%;
`;

export const CalculatorDatepicker: React.FC<IProps> = ({
  name,
  value,
  error,
  resolveErrorMessage,
  label,
  onSetFieldValue,
  mode,
  ...rest
}) => {
  const intl = useIntl();

  const handleDateChange = useCallback(
    (dateString: string) => {
      onSetFieldValue(name, dateString);
    },
    [name, onSetFieldValue]
  );

  const errorMsg = useMemo(() => {
    if (error && name && resolveErrorMessage) {
      return formatErrorMessage(intl, resolveErrorMessage(error, name));
    }
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <Wrapper>
      <Datepicker
        onChange={handleDateChange}
        value={value}
        labelProps={{
          validationInfoTrKeys: errorMsg ? [{ trKey: errorMsg }] : [],
          labelTrKey: label,
        }}
        initialValue={rest.defaultPickerValue?.toString()}
        isInvalid={!!errorMsg}
        placeholder={intl.formatMessage({
          id: "calculator.date.placeholder",
        })}
      />
    </Wrapper>
  );
};
