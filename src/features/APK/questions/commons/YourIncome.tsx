import { FC } from "react";
import { useIntl } from "react-intl";
import styled from "styled-components/macro";
import { Box, Flex } from "../../../../components/UI/Box";
import { ModalInfoIcon } from "../../../../components/UI/ModalInfoIcon";
import APKCurrencyInput from "./APKCurrencyInput";
import IncomeTitle from "./IncomeTitle";
import Question from "./Question";

interface IProps {
  income?: number;
  incomeForCollateral?: number;
  onIncomeForCollateralChange: (value?: number) => void;
}

const YourIncome: FC<IProps> = (props) => {
  const intl = useIntl();

  return (
    <>
      <ReadonlySection>
        <IncomeTitle income={props.income} />
        <hr />
        <StyledQuestion
          fullWidthAnswers={true}
          question={
            <>
              <Flex css={{ alignItems: "center" }}>
                {intl.formatMessage({
                  id: "apk.incomeForCollateral",
                })}
                <StyledModalInfoIcon
                  width={20}
                  modalContent={intl.formatMessage(
                    { id: "apk.incomeFofCollateralInfo" },
                    { br: <br /> }
                  )}
                />
              </Flex>
              <Box css={{ "& input": { width: 392 } }}>
                <APKCurrencyInput
                  value={props.incomeForCollateral}
                  maxValue={9999999999}
                  onChange={props.onIncomeForCollateralChange}
                />
              </Box>
            </>
          }
        ></StyledQuestion>
      </ReadonlySection>
    </>
  );
};

export default YourIncome;

const StyledQuestion = styled(Question)`
  margin-top: 42px;
`;

const ReadonlySection = styled.div`
  text-align: center;
  padding: 45px 0 0;
`;

const StyledModalInfoIcon = styled(ModalInfoIcon)`
  margin-left: 11px;
`;
