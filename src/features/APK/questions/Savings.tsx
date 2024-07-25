import { FC } from "react";
import { useIntl } from "react-intl";
import styled from "styled-components/macro";
import { needs33 } from "../../../common/features/Survey/components/AuxiliaryCalculator/NeedsCalculator/data";
import { INeedContainer, ISavings, ISetQuestionValue } from "../types";
import APKCurrencyInput from "./commons/APKCurrencyInput";
import NeedContainer from "./commons/NeedContainer";
import Question from "./commons/Question";
import Recommendation from "./commons/Recommendation";
import { APKTitle, APKTitleBold } from "./commons/APKTitle";
import { EditableSection } from "./commons/UI";

import SavingsPicture from "../../../assets/images/couple2-M.jpg";
import { Box, Flex } from "../../../components/UI/Box";
import { formatCurrency } from "../../../utils/transformers";

interface IProps extends ISetQuestionValue, INeedContainer {
  savings: ISavings;
}

const Savings: FC<IProps> = (props) => {
  const intl = useIntl();

  const handlevalueToSaveChange = (value?: number) => {
    props.setQuestionValue("valueToSave", value);
  };

  const handleOwnedSavingsChange = (value?: number) => {
    props.setQuestionValue("ownedSavings", value);
  };

  const TitleElement = (isExpanded: boolean) => (
    <APKTitle>
      {intl.formatMessage({ id: "apk.savings" })}{" "}
      <APKTitleBold>
        {isExpanded ? undefined : formatCurrency(props.savings.missingValue)}
      </APKTitleBold>
    </APKTitle>
  );

  return (
    <NeedContainer
      moveValueToCalculator={props.savings.moveValueToCalculator}
      setQuestionValue={props.setQuestionValue}
      titleElement={TitleElement}
      isExpandable={props.isExpandable}
      image={SavingsPicture}
      expandableElement={
        <>
          <Wrapper>
            <StyledQuestion
              fullWidthAnswers={true}
              question={
                <>
                  <Flex css={{ alignItems: "center" }}>
                    {intl.formatMessage({
                      id: "apk.savings.valueToSave.question",
                    })}
                  </Flex>
                  <Box css={{ "& input": { width: 211 } }}>
                    <APKCurrencyInput
                      value={props.savings.valueToSave}
                      onChange={handlevalueToSaveChange}
                      maxValue={9999999}
                      calculatorData={{ data: needs33, type: "needs" }}
                    />
                  </Box>
                </>
              }
            ></StyledQuestion>
            <hr />
            <StyledQuestion
              fullWidthAnswers={true}
              question={
                <>
                  <Flex css={{ alignItems: "center" }}>
                    {intl.formatMessage({
                      id: "apk.savings.ownedSavings.question",
                    })}
                  </Flex>
                  <Box css={{ "& input": { width: 392 } }}>
                    <APKCurrencyInput
                      onChange={handleOwnedSavingsChange}
                      value={props.savings.ownedSavings}
                      maxValue={9999999}
                    />
                  </Box>
                </>
              }
            ></StyledQuestion>
          </Wrapper>
          <Recommendation
            title={intl.formatMessage({
              id: "apk.savings.missingValue",
            })}
            amount={props.savings.missingValue}
          />
        </>
      }
    />
  );
};

export default Savings;

const StyledQuestion = styled(Question)`
  margin-top: 52px;
  margin-bottom: 0;
`;

const Wrapper = styled(EditableSection)`
  margin: 60px 0 36px;
`;
