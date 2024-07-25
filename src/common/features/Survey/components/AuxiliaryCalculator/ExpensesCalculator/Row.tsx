import React from "react";
import styled from "styled-components";
import { CodeTypes, TextTransformationCode } from "../../../Survey.types";
import SurveyInput from "../../SurveyInput";
import { IRow } from "./types";

interface IProps extends Omit<IRow, "index"> {
  isActive: boolean;
  value: string;
  setValue: (newValue: string) => void;
  validationPattern: string;
}

const ModalRow = styled.div`
  display: grid;
  grid-template-columns: 5fr 200px 4fr;
  margin-bottom: 10px;

  @media only screen and (max-width: 1024px) {
    grid-template-columns: 2fr 200px 1fr;
  }
`;

const Header = styled.div`
  font-size: 26px;
  color: ${({ theme }) => theme.newColors.white100};
  padding-right: 22px;
  text-align: right;
`;

const Row: React.FC<IProps> = (props) => {
  return (
    <ModalRow>
      <Header>{props.header}</Header>
      <SurveyInput
        transformationCode={TextTransformationCode.TTSE5}
        allowedSignsRegex={props.validationPattern}
        isApproved={false}
        value={props.value}
        onChange={props.setValue}
        textSuffix={props.suffix}
        type={CodeTypes.Integer}
        disabled={false}
      />
    </ModalRow>
  );
};

export default Row;
