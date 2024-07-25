import React, { FC, useMemo } from "react";
import DatePicker, {
  ReactDatePickerCustomHeaderProps,
  registerLocale,
} from "react-datepicker";
import { getMonth, getYear } from "date-fns";
import dateFnsFormat from "date-fns/format";
import pl from "date-fns/locale/pl";
import styled, { css } from "styled-components/macro";
import { useIntl } from "react-intl";
import {
  mainDateDisplayFormat,
  mainDateTimeDisplayFormat,
  mainDateValueFormat,
  mainDateTimeValueFormat,
  mapLocale,
} from "../../utils/dateUtils";
import { theme as defaultTheme } from "../../theme/theme";
import { Select, ISelectProps } from "./Select";
import { Icon } from "./Icon";
import { ILabelProps, Label } from "./Label";
import { ValidationInfo } from "./ValidationInfo";
import "react-datepicker/dist/react-datepicker.css";

const commonSelectProps: Partial<
  Omit<ISelectProps, "value" | "onChange" | "options">
> = {
  customStylesExtension: {
    container: {
      fontSize: "14px",
      fontWeight: 600,
    },
    control: {
      padding: "8px",
      border: "none",
      minHeight: "unset",
      boxShadow: `inset 0px 0px 0px 1px ${defaultTheme.newColors.gray30}`,
      minWidth: "80px",
    },
    menu: {
      border: "none",
    },
    option: {
      borderTop: "unset",
      padding: "4px 8px",

      ":hover": {
        color: defaultTheme.newColors.primary100,
        backgroundColor: defaultTheme.newColors.gray10,
      },
    },
  },
};

interface IDatepickerProps {
  initialValue?: string;
  dateDisplayFormat?: string;
  dateTimeDisplayFormat?: string;
  dateValueFormat?: string;
  dateTimeValueFormat?: string;
  showTimeSelect?: boolean;
  timeIntervals?: number;
  minDate?: Date;
  maxDate?: Date;
  value?: string;
  onChange: (value: string) => void;
  onBlur?: (value: string) => void;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  disabled?: boolean;
  isInvalid?: boolean;
  isApproved?: boolean;
  placeholder?: string;
  labelProps?: ILabelProps;
  hideEmptyValidations?: boolean;
}

registerLocale("pl", pl);

export const Datepicker: FC<IDatepickerProps> = (props) => {
  const {
    value,
    initialValue,
    labelProps,
    dateDisplayFormat,
    dateTimeDisplayFormat,
    dateValueFormat,
    dateTimeValueFormat,
    showTimeSelect,
    timeIntervals,
    minDate,
    maxDate,
    onFocus,
    onBlur,
    onChange,
    isInvalid,
    isApproved,
    disabled,
    hideEmptyValidations,
    placeholder,
  } = props;
  const minYear = useMemo(() => minDate!.getFullYear(), [minDate]);
  const maxYear = useMemo(() => maxDate!.getFullYear(), [maxDate]);

  const intl = useIntl();

  const months = useMemo(
    () => [...Array(12)].map(mapLocale(pl, "month", "wide")),
    []
  );
  const years = useMemo(
    () => [...Array(maxYear - minYear + 1)].map((_, index) => maxYear - index),
    [minYear, maxYear]
  );

  const getCustomHeader = useMemo(
    () =>
      ({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
      }: ReactDatePickerCustomHeaderProps) => {
        const leftArrowDisabled =
          getYear(date) === minYear && getMonth(date) === 0;
        const rightArrowDisabled =
          getYear(date) === maxYear && getMonth(date) === 11;

        return (
          <CustomHeaderWrapper>
            <ArrowWrapper tabIndex={0}>
              <ArrowIcon
                name="chevron-left"
                onClick={leftArrowDisabled ? undefined : decreaseMonth}
                disabled={leftArrowDisabled}
                width={20}
              />
            </ArrowWrapper>
            <MonthDatepickerSelect
              {...commonSelectProps}
              value={months[getMonth(date)]}
              options={months.map((month) => ({
                value: month,
                labelTrKey: month,
              }))}
              onChange={(value: string) => changeMonth(months.indexOf(value))}
              hideValidationInfo
            />
            <YearsDatepickerSelect
              {...commonSelectProps}
              value={getYear(date)}
              options={years.map((year) => ({ value: year, labelTrKey: year }))}
              onChange={(value: number) => changeYear(Number(value))}
              hideValidationInfo
            />
            <ArrowWrapper tabIndex={0}>
              <ArrowIcon
                name="chevron-right"
                onClick={rightArrowDisabled ? undefined : increaseMonth}
                disabled={rightArrowDisabled}
                width={20}
              />
            </ArrowWrapper>
          </CustomHeaderWrapper>
        );
      },
    [minYear, maxYear, months, years]
  );

  const validDateDisplayFormat = showTimeSelect
    ? dateTimeDisplayFormat
    : dateDisplayFormat;
  const validDateValueFormat = showTimeSelect
    ? dateTimeValueFormat
    : dateValueFormat;

  return (
    <>
      {labelProps && <Label {...labelProps} isInvalid={isInvalid} />}
      <Container isInvalid={isInvalid} isApproved={isApproved}>
        <DatepickerIcon name="calendar" width={20} color="gray60" />
        <DatePicker
          openToDate={
            initialValue && !value ? new Date(initialValue) : undefined
          }
          selected={value ? new Date(value) : undefined}
          onChange={(datepickerValue) => {
            onChange(
              datepickerValue
                ? dateFnsFormat(datepickerValue, validDateValueFormat!)
                : ""
            );
          }}
          locale="pl"
          onBlur={() => onBlur?.(value!)}
          onFocus={onFocus}
          dateFormat={validDateDisplayFormat}
          showTimeSelect={showTimeSelect}
          timeCaption={intl.formatMessage({
            id: "common.datepicker.timeCaption",
          })}
          timeIntervals={timeIntervals}
          renderCustomHeader={getCustomHeader}
          disabled={disabled}
          placeholderText={placeholder}
          minDate={minDate}
          maxDate={maxDate}
        />
      </Container>
      {(!hideEmptyValidations ||
        !!labelProps?.validationInfoTrKeys?.length) && (
        <ValidationInfo validations={labelProps?.validationInfoTrKeys} />
      )}
    </>
  );
};

Datepicker.defaultProps = {
  dateDisplayFormat: mainDateDisplayFormat,
  dateTimeDisplayFormat: mainDateTimeDisplayFormat,
  dateValueFormat: mainDateValueFormat,
  dateTimeValueFormat: mainDateTimeValueFormat,
  timeIntervals: 15,
  minDate: new Date("01/01/1920"),
  maxDate: new Date(),
  placeholder: "DD/MM/RRRR",
};

const Container = styled.div<{ isInvalid?: boolean; isApproved?: boolean }>`
  position: relative;

  .react-datepicker {
    font-family: unset;
    font-size: 14px;
    line-height: 20px;
    font-weight: 600;
    border: solid 2px ${({ theme }) => theme.newColors.gray100};
    border-radius: 0;
    color: ${({ theme }) => theme.newColors.gray100};
    box-shadow: ${({ theme }) => theme.shadows.elevation5};
    margin-top: -2px;
    margin-bottom: -2px;
    display: flex;

    & *:focus {
      outline: 0;
    }

    &__input-container input {
      width: 100%;
      height: 52px;
      background: ${({ theme }) => theme.newColors.white100};
      border: 0;
      box-shadow: inset 0px 0px 0px 1px ${({ theme }) => theme.newColors.gray30};
      text-align: left;
      color: ${({ theme }) => theme.newColors.gray100};
      -webkit-text-fill-color: ${({ theme }) => theme.newColors.gray100};
      background-clip: padding-box;
      position: relative;
      padding: 0 12px;
      padding-left: 44px;
      border-radius: 0;
      -webkit-appearance: none;

      &::placeholder {
        color: ${({ theme }) => theme.newColors.gray60};
        -webkit-text-fill-color: ${({ theme }) => theme.newColors.gray60};
        opacity: 1;
      }

      &:disabled {
        color: ${({ theme }) => theme.newColors.gray80};
        -webkit-text-fill-color: ${({ theme }) => theme.newColors.gray80};
        background: ${({ theme }) => theme.newColors.gray10};
        cursor: not-allowed;
        opacity: 1;
      }

      ${({ isInvalid, theme }) =>
        isInvalid &&
        css`
          box-shadow: inset 0px 0px 0px 2px ${theme.newColors.error};
        `}

      ${({ isApproved, theme }) =>
        isApproved &&
        css`
          &,
          &:disabled {
            box-shadow: inset 0px 0px 0px 2px ${theme.newColors.primary80};
            background-color: ${theme.newColors.white100};
          }
        `}

      &:hover:not(:focus):not(:disabled) {
        box-shadow: inset 0px 0px 0px 1px
          ${({ theme }) => theme.newColors.primary80};
      }

      &:focus {
        box-shadow: inset 0px 0px 0px 2px
          ${({ theme }) => theme.newColors.gray100};
        outline: 0;
      }
    }

    &__triangle {
      display: none;
    }

    &-popper {
      padding: 0 !important;

      z-index: 19;
    }

    &__header {
      border-bottom: 0;
      padding: 10px 12px 12px;
      border-radius: 0;
    }

    &__day-names {
      display: flex;
      justify-content: space-around;
      padding: 0;
      margin: 0;
      font-size: 12px;
      line-height: 16px;
      font-weight: 400;
    }

    &__day-name {
      text-transform: capitalize;
      color: ${({ theme }) => theme.newColors.gray80};
      width: 40px;
      height: 16px;
      line-height: inherit;
      margin: 0;
    }

    &__month {
      padding: 8px 12px 12px;
      margin: 0;
    }

    &__day {
      margin: 0;
      padding: 0;
      width: 40px;
      height: 40px;
      line-height: 40px;
      border-radius: 0;
      font-weight: 600;

      &--keyboard-selected {
        color: unset;
        background-color: unset;
      }

      &--today {
        color: ${({ theme }) => theme.newColors.primary80};
      }

      &--outside-month {
        color: ${({ theme }) => theme.newColors.gray60};
      }

      &--selected {
        color: ${({ theme }) => theme.newColors.white100};
        background-color: ${({ theme }) => theme.newColors.primary100};
      }

      &:hover {
        color: ${({ theme }) => theme.newColors.primary100};
        background-color: ${({ theme }) => theme.newColors.gray20};
      }
    }

    &__header--time {
      padding: 14px 12px;
    }

    &-time__header {
      font-weight: 600;
      font-size: 16px;
      line-height: 20px;
    }

    & .react-datepicker__time-container {
      border-left: 1px solid ${({ theme }) => theme.newColors.gray30};
      width: unset;

      & .react-datepicker__time .react-datepicker__time-box {
        width: unset;

        & ul.react-datepicker__time-list {
          width: 108px;

          &::-webkit-scrollbar {
            width: 8px;
            height: 0px;
          }

          &::-webkit-scrollbar-track {
            background-color: ${({ theme }) => theme.newColors.gray10};
          }
          &::-webkit-scrollbar-thumb {
            background-color: ${({ theme }) => theme.newColors.gray40};
          }

          & li.react-datepicker__time-list-item {
            height: 24px;
            padding: 2px 0;
            box-sizing: border-box;

            &:hover {
              color: ${({ theme }) => theme.newColors.primary100};
              background-color: ${({ theme }) => theme.newColors.gray20};
            }

            &--selected,
            &--selected:hover {
              color: ${({ theme }) => theme.newColors.white100};
              background-color: ${({ theme }) => theme.newColors.primary100};
            }
          }
        }
      }
    }
  }
`;

const DatepickerIcon = styled(Icon)`
  position: absolute;
  top: 0;
  bottom: 0;
  pointer-events: none;
  left: 12px;
  z-index: 1;
`;

const CustomHeaderWrapper = styled.div`
  display: flex;
  padding-bottom: 12px;
`;

const ArrowWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const DatepickerSelect = styled(Select)`
  border: solid 1px ${({ theme }) => theme.newColors.gray30};
`;

const MonthDatepickerSelect = styled(DatepickerSelect)`
  flex-grow: 1;
`;

const YearsDatepickerSelect = styled(DatepickerSelect)`
  flex-basis: 80px;
`;

const ArrowIcon = styled(Icon)<{ disabled: boolean }>`
  padding: 8px 4px;

  &:hover {
    svg path {
      stroke: ${({ theme }) => theme.newColors.primary80};
    }
  }

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;

      && svg path {
        stroke: ${({ theme }) => theme.newColors.gray80};
      }
    `}
`;
