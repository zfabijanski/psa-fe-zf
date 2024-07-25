import { FC } from "react";
import { IPreliminary, ISetQuestionValue } from "../../types";
import IncomeSource from "./IncomeSource";
import IncomeValue from "./IncomeValue";

interface IProps extends ISetQuestionValue {
  preliminary: IPreliminary;
}

const PreliminaryQuestions: FC<IProps> = (props) => {
  return (
    <>
      <IncomeSource
        setQuestionValue={props.setQuestionValue}
        value={props.preliminary.incomeSource}
      />
      <IncomeValue
        setQuestionValue={props.setQuestionValue}
        value={props.preliminary.incomeValue}
      />
    </>
  );
};

export default PreliminaryQuestions;
