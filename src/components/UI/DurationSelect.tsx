import { useEffect, useState, FC } from "react";
import { Select } from "./Select";
import styled from "styled-components/macro";
import { useIntl } from "react-intl";
import { ILabelProps, Label } from "./Label";
import { ValidationInfo } from "./ValidationInfo";

interface IDurationSelectProps {
  onChange: (value: string | number) => void;
  onBlur?: () => void;
  value: string | number;
  minValue: number;
  maxValue: number;
  isInvalid?: boolean;
  showMonths?: boolean;
  className?: string;
  disabled?: boolean;
  minMaxParamsInMonths?: boolean;
  valueInMonths?: boolean;
  labelProps: ILabelProps;
  hasDarkBackground?: boolean;
}

export const getDurationResolveParameter =
  (min: number, max: number, valueInMonths: boolean) => (paramName: string) => {
    const yearsMin = valueInMonths ? Math.floor(min / 12) : min;
    const monthsMin = min % 12;

    const yearsMax = valueInMonths ? Math.floor(max / 12) : max;
    const monthsMax = max % 12;

    switch (paramName) {
      case "yearsMin":
        return yearsMin;
      case "monthsMin":
        return monthsMin;
      case "monthsMax":
        return monthsMax;
      case "yearsMax":
        return yearsMax;
    }
    return undefined;
  };

export const DurationSelect: FC<IDurationSelectProps> = (props) => {
  const {
    onChange,
    onBlur,
    value,
    minValue,
    maxValue,
    isInvalid,
    showMonths,
    disabled,
    minMaxParamsInMonths,
    labelProps,
    valueInMonths,
    hasDarkBackground,
  } = props;

  const intl = useIntl();

  const [isFocused, setIsFocused] = useState(false);
  const [durationOptions, setDurationOptions] = useState<any>({});
  const [durationValue, setDurationValue] = useState<any>({});

  useEffect(() => {
    if (!value) {
      setDurationValue({});
      return;
    }
    const numberVal = Number(value || 0);
    const yearValue = Math.floor(numberVal / (valueInMonths ? 12 : 1));
    const monthValue =
      numberVal * (valueInMonths ? 1 : 12) - (yearValue || 0) * 12;
    setDurationValue({ yearValue, monthValue });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, valueInMonths]);

  useEffect(() => {
    const minYearValue = Math.floor(
      Number(minValue || 0) / (minMaxParamsInMonths ? 12 : 1)
    );
    const maxYearValue = Math.floor(
      Number(maxValue || 0) / (minMaxParamsInMonths ? 12 : 1)
    );
    const yearOptions = [];
    const monthOptions = [];
    const shortYearSuffix = intl.formatMessage({ id: "common.shortYear" });

    for (let i = minYearValue; i <= maxYearValue; i++) {
      yearOptions.push({
        value: i,
        labelTrKey: `${i} ${shortYearSuffix}`,
      });
    }

    if (showMonths) {
      const shortMonthSuffix = intl.formatMessage({ id: "common.shortMonth" });
      const maxMonthValue = Math.min(
        11,
        Number(maxValue || 0) * (minMaxParamsInMonths ? 1 : 12) -
          durationValue.yearValue * 12
      );
      for (let i = 0; i <= maxMonthValue; i++) {
        monthOptions.push({
          value: i,
          labelTrKey: `${i} ${shortMonthSuffix}`,
        });
      }
    }
    setDurationOptions({ yearOptions, monthOptions });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    minValue,
    maxValue,
    minMaxParamsInMonths,
    showMonths,
    durationValue.yearValue,
  ]);

  const handleOnBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const updateValue = (years: string, months: string) => {
    const yVal = Number(years || 0) * (valueInMonths ? 12 : 1);
    const mVal = Number(months || 0) / (!valueInMonths ? 12 : 1);
    onChange(Math.ceil(yVal + mVal));
  };
  return (
    <>
      {labelProps.labelTrKey && <Label {...labelProps} isInvalid={isInvalid} />}
      {showMonths ? (
        <SelectsContainer
          isDisabled={disabled}
          isInvalid={isInvalid}
          isFocused={isFocused}
        >
          <StyledSelect
            value={durationValue.yearValue}
            options={durationOptions.yearOptions}
            onChange={(value) => updateValue(value, durationValue.monthValue)}
            onBlur={handleOnBlur}
            disabled={disabled}
            isInvalid={isInvalid}
            onFocus={() => setIsFocused(true)}
            customStylesExtension={{
              control: {
                border: "none",
              },
            }}
            hideValidationInfo
          />
          <StyledSelect
            value={durationValue.monthValue}
            options={durationOptions.monthOptions}
            onChange={(value) => updateValue(durationValue.yearValue, value)}
            onBlur={handleOnBlur}
            disabled={disabled}
            isInvalid={isInvalid}
            onFocus={() => setIsFocused(true)}
            customStylesExtension={{
              control: {
                border: "none",
              },
            }}
            hideValidationInfo
          />
        </SelectsContainer>
      ) : (
        <Select
          value={durationValue.yearValue}
          options={durationOptions.yearOptions}
          onChange={(value) => updateValue(value, durationValue.monthValue)}
          onBlur={onBlur}
          disabled={disabled}
          isInvalid={isInvalid}
          hideValidationInfo
        />
      )}
      <ValidationInfo
        withIcon={hasDarkBackground}
        textColor={hasDarkBackground ? "white100" : "error"}
        validations={labelProps?.validationInfoTrKeys}
      />
    </>
  );
};

const StyledSelect = styled(Select)`
  flex-grow: 1;
`;

const SelectsContainer = styled.div<{
  isDisabled?: boolean;
  isInvalid?: boolean;
  isFocused: boolean;
}>`
  display: flex;
`;
