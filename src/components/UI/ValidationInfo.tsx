import { FC, ReactNode } from "react";
import styled, { CSSProp } from "styled-components/macro";
import { FormattedMessage } from "react-intl";
import { TDefaultThemeColor } from "../../theme/theme";
import { Icon } from "./Icon";
import { TypoBodyBold, TypoSmallBold } from "./typography";

export enum EValidationInfoSize {
  small = "small",
  body = "body",
}

interface IValidationInfo {
  className?: string;
  size?: keyof typeof EValidationInfoSize;
  css?: CSSProp;
  withIcon?: boolean;
  textColor?: TDefaultThemeColor;
  validations?: {
    trKey: string;
    values?: Record<string, ReactNode>;
  }[];
}

const Wrapper = styled.div<{
  componentSpacingTop: number;
  css?: CSSProp;
}>`
  margin-top: ${({ componentSpacingTop }) => componentSpacingTop}px;
  display: flex;
  align-items: flex-start;
  ${(props) => props.css};
`;

const SmallValidationInfo = styled(TypoSmallBold)<{
  textColor: TDefaultThemeColor;
}>`
  color: ${({ theme, textColor }) => theme.newColors[textColor]};
  line-height: 18px;
  min-height: 18px;
`;

const BodyValidationInfo = styled(TypoBodyBold)<{
  textColor: TDefaultThemeColor;
}>`
  color: ${({ theme, textColor }) => theme.newColors[textColor]};
  min-height: 20px;
`;

const StyledIcon = styled(Icon)<{
  iconSpacingRight: number;
  iconSpacingTop: number;
}>`
  margin-right: ${({ iconSpacingRight }) => iconSpacingRight}px;
  margin-top: ${({ iconSpacingTop }) => iconSpacingTop}px;
`;

const sizeDependentData = {
  [EValidationInfoSize.small]: {
    TypoComponent: SmallValidationInfo,
    iconSize: 18,
    iconSpacingRight: 4,
    iconSpacingTop: -1,
    componentSpacingTop: 4,
    iconName: "alert-fill",
    iconColor: undefined,
  },
  [EValidationInfoSize.body]: {
    TypoComponent: BodyValidationInfo,
    iconSize: 16,
    iconSpacingRight: 8,
    iconSpacingTop: 2,
    componentSpacingTop: 0,
    iconName: "alert-triangle",
    iconColor: "error",
  },
} as const;

export const ValidationInfo: FC<IValidationInfo> = (props) => {
  const {
    TypoComponent,
    iconSize,
    iconSpacingRight,
    iconSpacingTop,
    componentSpacingTop,
    iconName,
    iconColor,
  } = sizeDependentData[props.size!];

  return (
    <Wrapper
      className={props.className}
      componentSpacingTop={componentSpacingTop}
      css={props.css}
    >
      {!!props.validations?.length && props.withIcon && (
        <StyledIcon
          name={iconName}
          width={iconSize}
          iconSpacingRight={iconSpacingRight}
          iconSpacingTop={iconSpacingTop}
          color={iconColor as TDefaultThemeColor}
        />
      )}
      <TypoComponent textColor={props.textColor!}>
        {props.validations?.map((validation, index) => (
          <div key={index}>
            <FormattedMessage
              id={validation.trKey}
              values={validation.values}
            />
          </div>
        ))}
      </TypoComponent>
    </Wrapper>
  );
};

ValidationInfo.defaultProps = {
  size: EValidationInfoSize.small,
  textColor: "error",
};
