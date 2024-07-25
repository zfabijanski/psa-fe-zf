import { useRef, ReactNode, FocusEventHandler } from "react";
import { CSSObject as SerializeCSSObject } from "@emotion/serialize";
import BaseSelect, {
  ContainerProps,
  ControlProps,
  OptionProps,
  Props as NamedProps,
  GroupBase,
} from "react-select";
import { useIntl } from "react-intl";
import styled, { CSSObject } from "styled-components/macro";
import { theme as defaultTheme } from "../../theme/theme";
import { Icon } from "./Icon";
import { ILabelProps, Label } from "./Label";
import { ValidationInfo } from "./ValidationInfo";

export type SelectOption<T = any> = {
  value: T;
  text?: ReactNode;
  labelTrKey?: string | number;
} & Record<string, any>;

type CustomStylesExtension = NamedProps<SelectOption>["styles"];

export interface BaseSelectProps<T extends any> {
  value: T;
  options: SelectOption<T>[];
  onChange(value: T | any): void;
  className?: string;
  onBlur?: FocusEventHandler;
  disabled?: boolean;
  isInvalid?: boolean;
  isApproved?: boolean;
  onFocus?: FocusEventHandler;
  customStylesExtension?: Record<string, CSSObject>;
  labelProps?: ILabelProps;
  placeholder?: string;
  hasDarkBackground?: boolean;
  hideValidationInfo?: boolean;
}

export type ISelectProps<T = string> = BaseSelectProps<T>;

export function Select(
  props: BaseSelectProps<string> | BaseSelectProps<number>
): JSX.Element {
  const {
    className,
    value,
    onChange,
    labelProps,
    disabled,
    options = [],
    isInvalid,
    isApproved,
    onBlur,
    onFocus,
    customStylesExtension,
    placeholder,
    hasDarkBackground,
    hideValidationInfo,
  } = props;
  const intl = useIntl();
  const selectRef = useRef(null);

  const preparedOptions: SelectOption[] = options.map((option) => ({
    value: option.value,
    label:
      (option.labelTrKey
        ? intl.formatMessage({ id: option.labelTrKey as string })
        : option.text) || String(option.value),
  }));

  const selectedOption: SelectOption | undefined =
    // eslint-disable-next-line eqeqeq -- we don't want to compare types, only values to ensure that we can compare numbers and strings.
    preparedOptions?.find((option) => option.value == value);

  return (
    <Wrapper className={className}>
      {labelProps && (
        <Label
          {...labelProps}
          innerIconsCoordinates={{ top: "14px", right: "40px" }}
          isInvalid={isInvalid}
        />
      )}
      <BaseSelect<SelectOption>
        isSearchable={false}
        value={selectedOption}
        onChange={(selectedOption) => onChange(selectedOption?.value!)}
        onBlur={onBlur}
        components={{
          DropdownIndicator: (props) => (
            <Icon
              name={
                props.selectProps.menuIsOpen ? "chevron-up" : "chevron-down"
              }
              width={20}
            />
          ),
        }}
        placeholder={placeholder ?? ""}
        ref={selectRef}
        isDisabled={disabled}
        styles={customStyles(!!isInvalid, !!isApproved, customStylesExtension)}
        options={preparedOptions}
        onFocus={onFocus}
        blurInputOnSelect={false}
        noOptionsMessage={() =>
          intl.formatMessage({ id: "common.select.noOptions" })
        }
      />
      {!hideValidationInfo && (
        <ValidationInfo
          withIcon={hasDarkBackground}
          textColor={hasDarkBackground ? "white100" : "error"}
          validations={labelProps?.validationInfoTrKeys}
        />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.label`
  width: 100%;
`;

const customStyles = (
  isInvalid: boolean,
  isApproved: boolean,
  customStylesExtension?: CustomStylesExtension
) => {
  return {
    container: (
      provided: CSSObject,
      state: ContainerProps<any, any, GroupBase<any>>
    ): CSSObject => ({
      ...provided,
      cursor: state.isDisabled ? "not-allowed" : "pointer",
      pointerEvents: "initial",
      color: defaultTheme.newColors.gray100,
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "20px",

      "::-moz-scrollbar-button, ::-webkit-scrollbar-button": {
        width: "0px",
      },

      ...customStylesExtension?.container,
    }),
    control: (
      provided: CSSObject,
      state: ControlProps<any, any, GroupBase<any>>
    ) => ({
      width: "100%",
      background:
        state.isDisabled && !isApproved
          ? defaultTheme.newColors.gray10
          : defaultTheme.newColors.white100,
      display: "flex",
      border: 0,
      justifyContent: "space-evenly",
      padding: "16px 12px",

      ...(() => {
        if (state.isFocused)
          return {
            boxShadow: `inset 0px 0px 0px 2px ${defaultTheme.newColors.gray100}`,
          };
        if (isInvalid)
          return {
            boxShadow: `inset 0px 0px 0px 2px ${defaultTheme.newColors.error}`,
          };
        if (isApproved)
          return {
            boxShadow: `inset 0px 0px 0px 2px ${defaultTheme.newColors.primary80}`,
          };
        return {
          boxShadow: `inset 0px 0px 0px 1px ${defaultTheme.newColors.gray30}`,
        };
      })(),

      ...(!state.isFocused && !state.isDisabled
        ? {
            "&:hover": {
              boxShadow: `inset 0px 0px 0px 1px ${defaultTheme.newColors.primary80}`,
            },
          }
        : {}),

      ...customStylesExtension?.control,
    }),
    valueContainer: (provided: CSSObject) => ({
      ...provided,
      justifyContent: "left",
      paddingRight: 0,
      height: "20px",
      padding: 0,
      display: "-webkit-box",
      webkitBoxPack: "start",
      ...customStylesExtension?.valueContainer,
    }),
    singleValue: (provided: CSSObject) => ({
      ...provided,
      margin: "unset",
      ...customStylesExtension?.singleValue,
    }),
    input: (provided: SerializeCSSObject) => ({
      ...provided,
      padding: "unset",
      margin: "unset",
      ...customStylesExtension?.input,
    }),
    indicatorsContainer: (provided: CSSObject) => ({
      ...provided,
      padding: "unset",
      height: "20px",
      width: "20px",
      alignSelf: "center",
      ...customStylesExtension?.indicatorsContainer,
    }),
    indicatorSeparator: () => ({
      ...customStylesExtension?.indicatorSeparator,
    }),
    menu: (provided: CSSObject) => ({
      ...provided,
      marginTop: "-2px",
      boxShadow: defaultTheme.shadows.elevation5,
      background: defaultTheme.newColors.white100,
      zIndex: 12,
      border: `2px solid ${defaultTheme.newColors.gray100}`,
      borderRadius: "unset",
      ...customStylesExtension?.menu,
    }),
    option: (
      provided: CSSObject,
      state: OptionProps<any, any, GroupBase<any>>
    ) => ({
      padding: "12px",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      cursor: "pointer",
      textAlign: "left",
      backgroundColor: defaultTheme.newColors.white100,
      borderTop: `solid 1px ${defaultTheme.newColors.gray40}`,

      "&:first-of-type": {
        borderTop: "none",
      },

      "&:hover": {
        backgroundColor: defaultTheme.newColors.primary10,
        borderColor: defaultTheme.newColors.primary80,

        "& + div": {
          borderColor: defaultTheme.newColors.primary80,
        },
      },

      ...(state.isSelected
        ? {
            "&&&": {
              color: defaultTheme.newColors.white100,
              backgroundColor: defaultTheme.newColors.primary100,
              borderTop: "none",
            },

            ":hover": {
              color: defaultTheme.newColors.white100,
              backgroundColor: defaultTheme.newColors.primary100,
            },
          }
        : {}),

      ...customStylesExtension?.option,
    }),
    menuList: (provided: CSSObject) => ({
      ...provided,
      paddingTop: 0,
      paddingBottom: 0,

      "::-webkit-scrollbar": {
        width: "8px",
        height: "0px",
      },

      "::-webkit-scrollbar-track": {
        backgroundColor: defaultTheme.newColors.gray10,
      },

      "::-webkit-scrollbar-thumb": {
        backgroundColor: defaultTheme.newColors.gray40,
      },

      ...customStylesExtension?.menuList,
    }),
  } as CustomStylesExtension;
};
