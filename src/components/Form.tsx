import React, { FC, FormEvent, PropsWithChildren } from "react";
import styled from "styled-components";

export interface IFormProps {
  onSubmit?: () => void;
}

const StyledForm = styled.form`
  height: 100%;
`;

export const Form: FC<PropsWithChildren<IFormProps>> = (props) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (props.onSubmit) {
      props.onSubmit();
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit} role="form">
      {props.children}
    </StyledForm>
  );
};

export default Form;
