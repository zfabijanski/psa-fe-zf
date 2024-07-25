import React, { ChangeEvent } from "react";
import styled from "styled-components/macro";

export interface PruSwitchProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onValueChange?: (checked: boolean) => void;
}

export const PruSwitch = React.forwardRef<HTMLInputElement, PruSwitchProps>(
  ({ onValueChange, ...rest }, ref) => {
    const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (rest.onChange) {
        rest.onChange(e);
      }
      if (onValueChange) {
        onValueChange(e.target.checked);
      }
    };
    return (
      <Switch className={rest.className} role="checkbox">
        <Input {...rest} type="checkbox" onChange={handleValueChange} />
        <Slider />
      </Switch>
    );
  }
);

const Switch = styled.label`
  position: relative;
  width: 44px;
  min-width: 44px;
  height: 24px;
  display: block;
`;

const Slider = styled.div`
  font-family: "pru-internal_iconfont" !important;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  transition: 0.2s;
  border-radius: 11.5px;
  border: 1.5px solid ${({ theme }) => theme.newColors.gray100};
  background-color: ${({ theme }) => theme.newColors.white100};

  &:before {
    content: "\ue947";
    color: ${({ theme }) => theme.newColors.white100};
    background-color: ${({ theme }) => theme.newColors.gray100};
    line-height: 24px;
    height: 24px;
    width: 24px;
    position: absolute;
    top: -1.5px;
    left: -1.5px;
    transition: 0.2s;
    border-radius: 50%;
  }
`;

const Input = styled.input`
  display: none;

  &:checked + ${Slider} {
    border: none;
    background-color: ${({ theme }) => theme.newColors.primary100};

    &:before {
      content: "\ue90f";
      color: ${({ theme }) => theme.newColors.gray100};
      background-color: ${({ theme }) => theme.newColors.white100};
      height: 20px;
      width: 20px;
      line-height: 21px;
      position: absolute;
      top: 2px;
      left: 22px;
      transition: 0.2s;
      border-radius: 50%;
    }
  }
`;

export default PruSwitch;
