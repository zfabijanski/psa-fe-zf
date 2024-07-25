import { FC, useState } from "react";
import styled, { CSSProp } from "styled-components";
import omit from "lodash/omit";
import { TextTransformationCode } from "../Survey.types";
import { transformStringWithPattern } from "utils/formatters";
import ApprovalIcon from "components/UI/ApprovalIcon";
import { TextArea, ITextAreaProps } from "components/UI/TextArea";

export interface SurveyTextAreaProps extends ITextAreaProps {
  css?: CSSProp;
  transformationCode: TextTransformationCode;
}

const SurveyTextAreaContaienr = styled.div<{
  css?: CSSProp;
  disabled?: boolean;
}>`
  display: flex;
  width: 100%;
  position: relative;
  opacity: ${({ theme, disabled }) => (disabled ? theme.opacityDisabled : 1)};
  ${(props) => props.css};
`;

const SurveyTextArea: FC<SurveyTextAreaProps> = ({
  css,
  className,
  transformationCode,
  isInvalid,
  labelProps,
  ...props
}) => {
  const [touched, setTouched] = useState(false);

  const onBlur = () => {
    setTouched(true);

    props.onChange(
      transformStringWithPattern(props.value.trim(), transformationCode)
    );
  };

  return (
    <SurveyTextAreaContaienr
      css={css}
      disabled={props.disabled}
      className={className}
    >
      {props.isApproved && <ApprovalIcon />}
      <TextArea
        autoFocus={!props.isApproved && !props.disabled}
        {...props}
        isInvalid={isInvalid && touched}
        labelProps={omit(labelProps, touched ? "" : "validationInfoTrKeys")}
        onBlur={onBlur}
      />
    </SurveyTextAreaContaienr>
  );
};

export default SurveyTextArea;
