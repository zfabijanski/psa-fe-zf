import { FC } from "react";
import { useIntl } from "react-intl";
import styled from "styled-components";
import { ISetQuestionValue } from "../../types";
import APKCurrencyInput from "../commons/APKCurrencyInput";
import Header from "../commons//Header";

interface IProps extends ISetQuestionValue {
  value?: number;
}

const IncomeValue: FC<IProps> = ({ setQuestionValue, value }) => {
  const intl = useIntl();
  const question = intl.formatMessage({
    id: "apk.preliminary.incomeValue.question",
  });
  const handleChange = (eventValue?: number) => {
    setQuestionValue("incomeValue", eventValue);
  };
  return (
    <Container>
      <Header question={question} />
      <Answer>
        <APKCurrencyInput
          onChange={handleChange}
          value={value}
          maxValue={999999}
        />
      </Answer>
    </Container>
  );
};
export default IncomeValue;

const Container = styled.div`
  display: flex;
  margin-top: 62px;
  margin-bottom: 80px;
  align-items: center;
`;

const Answer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & input {
    width: 392px;
  }
`;
