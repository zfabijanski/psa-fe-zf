import React, { FC } from "react";
import styled from "styled-components/macro";
import { Input, IInputProps } from "./Input";

export const PhoneNumberInput: FC<IInputProps> = React.memo(
  ({
    allowedSignsRegex = /^[0-9\s]*$/,
    fixedPlaceholderConfig = {
      fixedPlaceholder: "___ ___ ___",
      maskPattern: "xxx xxx xxx",
    },
    ...restProps
  }) => {
    return (
      <Wrapper>
        <StyledInput
          {...restProps}
          allowedSignsRegex={allowedSignsRegex}
          fixedPlaceholderConfig={fixedPlaceholderConfig}
        />
      </Wrapper>
    );
  }
);

const Wrapper = styled.div`
  position: relative;

  &:before {
    position: absolute;
    top: 24px;
    left: calc(12px);
    line-height: 52px;
    content: "+48";
    z-index: 1;
    font-weight: 600;
    pointer-events: none;
  }
`;

const StyledInput = styled(Input)`
  padding-left: 49px;
`;
