import React, { useEffect, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { TextArea } from "../../../../../components/UI/TextArea";
import { ISignature } from "../../../types";
import Signature from "./Signature";

const Container = styled.div<{ isInvalid?: boolean }>`
  background-color: white;
  padding: 12px;
  color: ${({ theme }) => theme.newColors.neutral100Default};
  font-size: 16px;
  line-height: 20px;
  width: 100%;

  box-shadow: ${({ theme, isInvalid }) =>
    isInvalid
      ? `inset 0px 0px 0px 2px ${theme.newColors.error}`
      : `inset 0px 0px 0px 1px ${theme.newColors.gray30}`};

  &:hover {
    box-shadow: inset 0px 0px 0px 1px
      ${({ theme }) => theme.newColors.primary80};
  }
`;

const StyledTextArea = styled(TextArea)`
  box-shadow: none !important;
`;

const ContentLabel = styled.span`
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.newColors.gray100};
`;
const ContentError = styled(ContentLabel)`
  display: block;
  color: ${({ theme }) => theme.newColors.error};
  margin: 4px 0 2px;
  font-weight: 600;
`;

interface IProps {
  value: string;
  onChange: (value: string, isValid: boolean) => void;
  validationFunction: (value: string) => boolean;
  signature?: ISignature;
  isFocusable: boolean;
  validationTrKey?: string;
}

const Content: React.FC<IProps> = ({
  value,
  onChange,
  signature,
  isFocusable,
  validationFunction,
  validationTrKey,
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const isInvalid = !!validationTrKey;
  const [internalValue, setInternalValue] = useState(value);

  const handleBlur = (newValue: string) => {
    const isValueValid = validationFunction(newValue);
    onChange(newValue, isValueValid);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "0px"; // we need to reset the height to make it shrink when removing lines.
      inputRef.current.style.height = inputRef.current.scrollHeight + "px";
    }
  }, [internalValue]);

  return (
    <div>
      <ContentLabel>
        <FormattedMessage id="mail.label.messageBody" />
      </ContentLabel>
      {validationTrKey && (
        <ContentError>
          <FormattedMessage id={validationTrKey} />
        </ContentError>
      )}
      <Container isInvalid={isInvalid}>
        <StyledTextArea
          value={internalValue}
          onBlur={handleBlur}
          onChange={setInternalValue}
          ref={inputRef}
        />
        {!!signature && <Signature {...signature} />}
      </Container>
    </div>
  );
};

export default Content;
