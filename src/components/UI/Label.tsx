import React from "react";
import styled, { CSSProp } from "styled-components/macro";
import { useIntl } from "react-intl";
import { ModalInfoIcon } from "./ModalInfoIcon";
import { IModalData } from "../../models/Modal";
import { TypoSmallRegular } from "./typography";
import { TranslationValue } from "utils/types";

interface IInnerIconsCoordinates {
  right: string;
  top: string;
}

export interface ILabelProps extends IModalData {
  labelTextStyles?: CSSProp;
  isInvalid?: boolean;
  labelText?: string | React.ReactNode;
  labelTrKey?: string;
  innerIcons?: boolean;
  validationInfoTrKeys?: {
    trKey: string;
    values?: Record<string, TranslationValue>;
  }[];
  handleLabelClick?: () => void;
  innerIconsCoordinates?: IInnerIconsCoordinates;
  className?: string;
  hasDarkBackground?: boolean;
}

export const Label: React.FC<ILabelProps> = (props) => {
  const {
    labelTextStyles,
    labelText,
    labelTrKey,
    innerIcons,
    modalContentTrKey,
    modalContent,
    modalButtons,
    handleLabelClick,
    innerIconsCoordinates,
    className,
    modalHtml,
    modalHtmlTrValues,
    hasDarkBackground,
  } = props || {};

  const intl = useIntl();

  return (
    <LabelContainer
      labelWithText={!!(labelTrKey || labelText)}
      className={className}
    >
      <LabelText labelTextStyles={labelTextStyles} onClick={handleLabelClick}>
        {labelText ||
          (labelTrKey ? intl.formatMessage({ id: labelTrKey }) : "")}
      </LabelText>
      <Icons
        innerIcons={innerIcons}
        innerIconsCoordinates={innerIconsCoordinates}
      >
        {(modalContentTrKey || modalHtml) && (
          <ModalInfoIcon
            modalContentTrKey={modalContentTrKey}
            modalContent={modalContent}
            modalButtons={modalButtons}
            modalHtml={modalHtml}
            modalHtmlTrValues={modalHtmlTrValues}
            hasDarkBackground={hasDarkBackground}
          />
        )}
      </Icons>
    </LabelContainer>
  );
};

Label.defaultProps = {
  innerIconsCoordinates: {
    top: "calc(100% + 22px)",
    right: "calc(100% - 26px)",
  },
};

const LabelContainer = styled.div<{ labelWithText: boolean }>`
  position: relative;
  ${({ labelWithText }) => labelWithText && "margin-bottom: 4px"};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LabelText = styled(TypoSmallRegular)<{ labelTextStyles?: CSSProp }>`
  cursor: default;
  display: inline-block;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: pre;
  ${({ labelTextStyles }) => labelTextStyles}
`;

const Icons = styled.div<{
  innerIcons?: boolean;
  innerIconsCoordinates?: IInnerIconsCoordinates;
}>`
  display: flex;
  margin-bottom: 5px;
  z-index: 1;

  ${({ innerIcons, innerIconsCoordinates }) =>
    innerIcons &&
    `
    position: absolute;
    top: ${innerIconsCoordinates?.top};
    right: ${innerIconsCoordinates?.right};
  `}

  > *:not(:last-child) {
    margin-right: 10px;
  }
`;
