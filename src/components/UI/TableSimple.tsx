import React, { FC } from "react";
import styled, { css } from "styled-components/macro";
import { FormattedMessage } from "react-intl";
import { IModalData } from "../../models/Modal";
import { EValueToFormatType, formatValue } from "../../utils/formatValueUtils";
import { ModalInfoIcon } from "./ModalInfoIcon";
import { FormItemWrapper, FormWrapper } from "./styled";
import { TypoBodyBold, TypoSmallRegular } from "./typography";

interface ITableSimpleRecord extends IModalData {
  label: string;
  id: string | number;
  size: number;
  translationValues?: Record<string, React.ReactNode>;
  valueType?: EValueToFormatType;
}

interface ITableSimpleProps {
  records: ITableSimpleRecord[];
  className?: string;
  fieldValues: Record<string, unknown>;
}

export const TableSimple: FC<ITableSimpleProps> = (props) => {
  let counter = 0;
  return (
    <StyledFormWrapper className={props.className}>
      {props.records.map((record, index) => {
        const {
          label,
          id,
          size,
          translationValues,
          valueType,
          ...modalInfoIconProps
        } = record;
        const isFirstInRow = counter === 0;
        counter += size;
        const isLastInRow = counter % 12 === 0;
        if (isLastInRow) counter = 0;

        return (
          <StyledFormItemWrapper
            key={index}
            size={size}
            isFirstInRow={isFirstInRow}
            isLastInRow={isLastInRow}
          >
            <Label>
              <FormattedMessage id={label} values={translationValues} />
              {(modalInfoIconProps?.modalContentTrKey ||
                modalInfoIconProps?.modalHtml) && (
                <StyledModalInfoIcon {...modalInfoIconProps} />
              )}
            </Label>
            <TypoBodyBold>
              {props.fieldValues?.[id] ? (
                <FormattedMessage
                  id={formatValue(valueType, props.fieldValues[id]) as string}
                  values={translationValues}
                />
              ) : (
                "-"
              )}
            </TypoBodyBold>
          </StyledFormItemWrapper>
        );
      })}
    </StyledFormWrapper>
  );
};

const StyledFormWrapper = styled(FormWrapper)`
  margin: 0;
  align-items: stretch;
`;

const StyledFormItemWrapper = styled(FormItemWrapper)<{
  isFirstInRow: boolean;
  isLastInRow: boolean;
}>`
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.newColors.gray30};
  border-right: 1px solid ${({ theme }) => theme.newColors.gray30};
  margin-bottom: 0;

  ${({ isFirstInRow }) =>
    isFirstInRow &&
    css`
      padding-left: 0;
    `}

  ${({ isLastInRow }) =>
    isLastInRow &&
    css`
      padding-right: 0;
      border-right-width: 0;
    `}
`;

const Label = styled(TypoSmallRegular)`
  color: ${({ theme }) => theme.newColors.gray80};
  margin-bottom: 8px;
  display: flex;
  align-items: center;
`;

const StyledModalInfoIcon = styled(ModalInfoIcon)`
  margin-left: 8px;
`;
