import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import styled from "styled-components/macro";
import { needs32 } from "../../../../common/features/Survey/components/AuxiliaryCalculator/NeedsCalculator/data";
import { Box, Flex } from "../../../../components/UI/Box";
import { ModalInfoIcon } from "../../../../components/UI/ModalInfoIcon";
import SelectButton from "../../../../components/UI/SelectButton";
import { formatCurrency } from "../../../../utils/transformers";
import { ISetQuestionValue } from "../../types";
import APKCurrencyInput from "../commons/APKCurrencyInput";
import Question from "../commons/Question";

interface IProps extends ISetQuestionValue {
  increasedByValue?: number;
  pension?: number;
}

const IncreasedBy: FC<IProps> = (props) => {
  const intl = useIntl();
  const [calculatorValue, setCalculatorValue] = useState<number | undefined>();

  const getIncreasedByButton = (increasedBy: number) => ({
    id: increasedBy,
    label: formatCurrency(increasedBy),
    active: props.increasedByValue === increasedBy,
  });

  const [increasedByButtons, setIncreasedByButtons] = useState([
    getIncreasedByButton(500),
    getIncreasedByButton(1000),
    getIncreasedByButton(1500),
  ]);

  const handleIncreasedByChangeFromInput = (
    value?: number,
    isFromCalculator?: boolean
  ) => {
    if (isFromCalculator && value !== undefined && props.pension) {
      setCalculatorValue(value);
      const newValue = value - props.pension;
      props.setQuestionValue("increasedBy", newValue > 0 ? newValue : 0);
    } else {
      props.setQuestionValue("increasedBy", value);
      setCalculatorValue(undefined);
    }
    setIncreasedByButtons((previousIncreasedBy) =>
      previousIncreasedBy.map((increasedBy) => ({
        ...increasedBy,
        active: false,
      }))
    );
  };

  useEffect(() => {
    if (calculatorValue) {
      handleIncreasedByChangeFromInput(calculatorValue, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.pension]);

  const handleIncreasedByChangeFromOptions = (id: number) => () => {
    props.setQuestionValue("increasedBy", id);
    setIncreasedByButtons((previousIncreasedBy) =>
      previousIncreasedBy.map((increasedBy) => {
        if (increasedBy.id === id) {
          return {
            ...increasedBy,
            active: true,
          };
        }
        return {
          ...increasedBy,
          active: false,
        };
      })
    );
  };

  return (
    <StyledQuestion
      fullWidthAnswers={true}
      question={
        <>
          <Flex css={{ alignItems: "center" }}>
            {intl.formatMessage({
              id: "apk.retirement.increasedBy",
            })}
            <StyledModalInfoIcon
              width={20}
              modalContent={intl.formatMessage(
                { id: "apk.retirement.info" },
                { br: <br /> }
              )}
            />
          </Flex>
          <Box css={{ "& input": { width: 211 } }}>
            <APKCurrencyInput
              value={props.increasedByValue}
              onChange={handleIncreasedByChangeFromInput}
              maxValue={999999}
              calculatorData={{ data: needs32, type: "needs" }}
            />
          </Box>
        </>
      }
    >
      <Answers>
        {increasedByButtons.map((increasedBy) => (
          <Button
            key={increasedBy.id}
            isActive={increasedBy.active}
            text={increasedBy.label}
            disabled={false}
            onClick={handleIncreasedByChangeFromOptions(increasedBy.id)}
          />
        ))}
      </Answers>
    </StyledQuestion>
  );
};

export default IncreasedBy;

const StyledQuestion = styled(Question)`
  margin-top: 84px;
`;

const StyledModalInfoIcon = styled(ModalInfoIcon)`
  margin-left: 11px;
`;

const Answers = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 12px;
  margin: 35px 0;
`;

const Button = styled(SelectButton)`
  width: 100%;
  margin: 0;
  padding: 10px 20px;
  &:hover {
    border: 3px solid #cacbcc !important;
  }
`;
