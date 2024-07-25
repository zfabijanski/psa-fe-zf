import React from "react";
import styled, { CSSProp } from "styled-components";
import { subYears } from "date-fns";
import ApprovalIcon from "components/UI/ApprovalIcon";
import { Datepicker } from "components/UI/Datepicker";
import { IStatusFlags } from "components/UI/helpersUI";

interface IProps extends IStatusFlags {
  onChange: (newValue: string) => void;
  value: string;
  disabled: boolean;
  css?: CSSProp;
}

const Wrapper = styled.div<Pick<IProps, "disabled" | "css">>`
  width: 308px;
  position: relative;
  opacity: ${({ theme, disabled }) => (disabled ? theme.opacityDisabled : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};

  & > span {
    height: 50px;
    line-height: 0px;
  }

  ${(props) => props.css};
`;

export const SurveyDatePicker: React.FC<IProps> = ({
  isApproved,
  onChange,
  value,
  disabled,
  css,
}) => {
  return (
    <Wrapper disabled={disabled} css={css}>
      {isApproved && <ApprovalIcon />}
      <Datepicker
        value={value}
        isApproved={isApproved}
        onChange={onChange}
        disabled={disabled}
        minDate={subYears(Date.now(), 110)}
        maxDate={subYears(Date.now(), 14)}
        hideEmptyValidations
      />
    </Wrapper>
  );
};

export default SurveyDatePicker;
