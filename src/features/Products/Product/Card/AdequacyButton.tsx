import React, { useMemo } from "react";
import { useIntl } from "react-intl";
import styled from "styled-components";
import { TIconType } from "../../../../components/UI/Icon";
import PruButton, {
  PruButtonType,
} from "../../../../components/UI/PruButton/PruButton";
import { ProductCategory } from "../../../../models/common";
import { AdequacyStatus, AdequacyType, StatusType } from "../../types";

interface IProps {
  productCategories: ProductCategory[];
  adequacyStatus: AdequacyType;
  isAdequate: StatusType;
  onClick: (e: React.MouseEvent) => void;
}

interface ButtonConfig {
  label: string;
  icon?: TIconType;
  buttonType?: PruButtonType;
}

const StyledPruButton = styled(PruButton)`
  padding: 0 12px;

  ${({ theme, buttonType }) => {
    switch (buttonType) {
      case "secondary":
        return `
          border-color: ${theme.newColors.gray30};
          background-color: ${theme.newColors.white100};

          & svg path {
            stroke: ${theme.newColors.success} !important;
          }

          &:hover,
          &:active:not(:disabled) {
            border-color: ${theme.newColors.grayDark};
            color: ${theme.newColors.grayDark};
          }
        `;
      case "error":
        return `
          border-color: ${theme.newColors.gray30};
          background-color: ${theme.newColors.white100};
          color: ${theme.newColors.error};


          & svg path,
          &:active:not(:disabled) svg path {
            stroke: ${theme.newColors.error} !important;
          }

          &:hover,
          &:active:not(:disabled) {
            background-color: ${theme.newColors.white100};
            border-color: ${theme.newColors.grayDark};
            color: ${theme.newColors.grayDark};
          }

          &:active:not(:disabled) {
            color: ${theme.newColors.error};
          }

          &:hover svg path {
            stroke: ${theme.newColors.grayDark} !important;
          }
        `;
      default:
        return `
          & svg path {
            stroke: ${theme.newColors.white100} !important;
          }
        `;
    }
  }};
`;

const getButtonConfig = (
  adequacyStatus: AdequacyType,
  isProtective: boolean | null,
  isAdequate: boolean | null
): ButtonConfig => {
  if (adequacyStatus === AdequacyStatus.Denied) {
    return {
      label: "piwAndBop.label.deniedAdequacy",
      buttonType: "primaryBlack",
    };
  }

  if (isProtective) {
    switch (isAdequate) {
      case null:
        return { label: "piwAndBop.label.checkNeeds" };
      default:
        return {
          label: "piwAndBop.label.reportPiw",
          icon: "check",
          buttonType: "secondary",
        };
    }
  }

  switch (isAdequate) {
    case true:
      return {
        label: "bop.label.adequateProduct",
        icon: "check",
        buttonType: "secondary",
      };
    case false:
      return {
        label: "bop.label.inAdequateProduct",
        icon: "x",
        buttonType: "error",
      };
    default:
      return { label: "bop.label.checkAdequacy" };
  }
};

const AdequacyButton: React.FC<IProps> = (props) => {
  const intl = useIntl();

  const {
    label,
    icon = "chevron-right",
    buttonType = "primary",
  } = useMemo(
    () =>
      getButtonConfig(
        props.adequacyStatus,
        props.productCategories.includes(ProductCategory.Protective),
        props.isAdequate
      ),
    [props.adequacyStatus, props.isAdequate, props.productCategories]
  );

  return (
    <StyledPruButton
      buttonType={buttonType}
      onClick={props.onClick}
      size="medium"
      icon={icon}
      iconPosition="right"
    >
      {intl.formatMessage({ id: label })}
    </StyledPruButton>
  );
};

export default AdequacyButton;
