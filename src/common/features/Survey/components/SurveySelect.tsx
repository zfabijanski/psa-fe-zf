import { FC } from "react";
import styled, { CSSProp } from "styled-components";
import ApprovalIcon from "components/UI/ApprovalIcon";
import { Select, ISelectProps } from "components/UI/Select";

interface SurveySelectProps extends ISelectProps {
  css?: CSSProp;
}

const SurveySelectContaienr = styled.div<{ css?: CSSProp; disabled?: boolean }>`
  display: flex;
  width: 100%;
  position: relative;
  opacity: ${({ theme, disabled }) => (disabled ? theme.opacityDisabled : 1)};
  ${(props) => props.css};
`;

const SurveySelect: FC<SurveySelectProps> = ({ css, className, ...props }) => (
  <SurveySelectContaienr
    css={css}
    disabled={props.disabled}
    className={className}
  >
    {props.isApproved && <ApprovalIcon />}
    <Select {...props} />
  </SurveySelectContaienr>
);

export default SurveySelect;
