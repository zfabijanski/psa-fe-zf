import { HTMLAttributes } from "react";
import styled, { CSSProp } from "styled-components";
import { CalculatorQuestionCodes } from "../../common/features/Survey/Survey.types";
import {
  addNonBreakingSpace,
  addNonBreakingSpaceToNumber,
  breakOnSlash,
} from "../../utils/formatters";
import { WhiteSpace } from "../../utils/types";
import ApprovalIcon from "./ApprovalIcon";
import PruIcon, { IconType } from "./PruIcon/PruIcon";

export interface ISelectButtonProps extends HTMLAttributes<HTMLButtonElement> {
  questionCode?: string;
  height?: number;
  text?: string;
  icons?: IconType[];
  isActive?: boolean;
  isApproved?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  count?: number;
  css?: CSSProp;
}

const ApprovalIconStyled = styled(ApprovalIcon)`
  bottom: -13px;
`;

const TextWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 12px;
`;

const CustomButton = styled.button<
  ISelectButtonProps & { percentageWidth?: number; css?: CSSProp }
>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  height: ${({ icons, height }) =>
    icons?.length ? "160px" : height ? `${height}px` : "auto"};
  width: ${({ percentageWidth, count = 1 }) =>
    `calc(${percentageWidth || (count > 4 ? 25 : 100 / count)}% - 24px)`};
  margin: 12px;
  min-height: 112px;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  word-break: break-word;
  border: 2px solid
    ${({ theme, isActive }) =>
      isActive ? theme.newColors.primary80 : "transparent"};
  box-shadow: ${({ isActive }) =>
    isActive
      ? "none"
      : "0px 18px 28px rgba(10, 27, 56, 0.16), 0px 0px 1px rgba(10, 27, 56, 0.32)"};
  color: ${({ theme }) => theme.newColors.gray100};
  opacity: ${({ theme, disabled }) => (disabled ? theme.opacityDisabled : 1)};
  background-color: ${({ theme }) => theme.newColors.white100};
  position: relative;
  transition: none;
  cursor: ${({ disabled }) => (disabled ? "auto" : "pointer")};

  :not(:disabled):hover {
    box-shadow: none;
  }

  ${(props) => props.css};
`;

const customPruSelectButtonPercentageWidthMap: Record<string, number> = {
  [CalculatorQuestionCodes.ADQ_QUE_4]: 20,
};

const SelectButton = (props: ISelectButtonProps) => {
  const { children, icons, text, isApproved, disabled } = props;
  const formattedText = () =>
    text && (
      <TextWrapper>
        {addNonBreakingSpace(
          addNonBreakingSpaceToNumber(breakOnSlash(text)),
          WhiteSpace.NonBreakingSpace
        )}
      </TextWrapper>
    );

  return (
    <CustomButton
      disabled={disabled}
      percentageWidth={
        customPruSelectButtonPercentageWidthMap[props.questionCode!]
      }
      {...props}
    >
      {isApproved && <ApprovalIconStyled />}
      {icons && icons.length > 0 && (
        <IconWrapper>
          {icons.map((icon, id) => (
            <PruIcon key={id} type={icon} />
          ))}
        </IconWrapper>
      )}
      {formattedText()}
      {children}
    </CustomButton>
  );
};

export default SelectButton;
