import { FC } from "react";
import { useIntl } from "react-intl";
import styled from "styled-components";
import SelectButton from "../../../../components/UI/SelectButton";
import { IIncomeSource, ISetQuestionValue } from "../../types";
import Question from "../commons/Question";

interface IProps extends ISetQuestionValue {
  value?: IIncomeSource;
}

const IncomeSource: FC<IProps> = ({ setQuestionValue, value }) => {
  const intl = useIntl();
  const question = intl.formatMessage({
    id: "apk.preliminary.incomeSource.question",
  });

  const answerLabels = [
    {
      id: "fullTimeOrContract",
      label: intl.formatMessage({
        id: "apk.preliminary.incomeSource.fullTimeOrContract",
      }),
    },
    {
      id: "other",
      label: intl.formatMessage({ id: "apk.preliminary.incomeSource.other" }),
    },
    {
      id: "unemployed",
      label: intl.formatMessage({
        id: "apk.preliminary.incomeSource.unemployed",
      }),
    },
  ];

  const handleClick = (id: string) => () => {
    setQuestionValue("incomeSource", id);
  };

  return (
    <Question question={question} fullWidthAnswers={true}>
      {
        <Answers>
          {answerLabels.map((answer) => (
            <Button
              key={answer.id}
              isActive={value === answer.id}
              text={answer.label}
              disabled={false}
              onClick={handleClick(answer.id)}
            />
          ))}
        </Answers>
      }
    </Question>
  );
};

export default IncomeSource;

const Answers = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 12px;
`;

const Button = styled(SelectButton)`
  width: 100%;
  min-height: 112px;
  margin: 0;
  padding: 10px 20px;

  span {
    white-space: pre-wrap;
  }
`;
