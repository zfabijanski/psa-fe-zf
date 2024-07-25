import { FC } from "react";
import { useIntl } from "react-intl";
import styled from "styled-components/macro";
import { needs34 } from "../../../common/features/Survey/components/AuxiliaryCalculator/NeedsCalculator/data";
import { IChildFuture, INeedContainer, ISetQuestionValue } from "../types";
import APKCurrencyInput from "./commons/APKCurrencyInput";
import NeedContainer from "./commons/NeedContainer";
import Question from "./commons/Question";
import Recommendation from "./commons/Recommendation";
import { APKTitle, APKTitleBold } from "./commons/APKTitle";
import { EditableSection } from "./commons/UI";

import ChildFuturePicture from "../../../assets/images/girl-M.jpg";
import { Box, Flex } from "../../../components/UI/Box";
import { formatCurrency } from "../../../utils/transformers";

interface IProps extends ISetQuestionValue, INeedContainer {
  income?: number;
  childFuture: IChildFuture;
}

const ChildFuture: FC<IProps> = (props) => {
  const intl = useIntl();

  const handleExpectedValueChange = (value?: number) => {
    props.setQuestionValue("expectedValue", value);
  };

  const handleCurrentValueChange = (value?: number) => {
    props.setQuestionValue("currentValue", value);
  };

  const TitleElement = (isExpanded: boolean) => (
    <APKTitle>
      {intl.formatMessage({ id: "apk.childFuture" })}{" "}
      <APKTitleBold>
        {isExpanded ? "" : formatCurrency(props.childFuture.missingValue)}
      </APKTitleBold>
    </APKTitle>
  );

  return (
    <NeedContainer
      moveValueToCalculator={props.childFuture.moveValueToCalculator}
      setQuestionValue={props.setQuestionValue}
      titleElement={TitleElement}
      isExpandable={props.isExpandable}
      image={ChildFuturePicture}
      expandableElement={
        <>
          <Wrapper>
            <StyledQuestion
              fullWidthAnswers={true}
              question={
                <>
                  <Flex css={{ alignItems: "center" }}>
                    {intl.formatMessage({
                      id: "apk.childFuture.expectedValue",
                    })}
                  </Flex>
                  <Box css={{ "& input": { width: 211 } }}>
                    <APKCurrencyInput
                      value={props.childFuture.expectedValue}
                      onChange={handleExpectedValueChange}
                      maxValue={9999999}
                      calculatorData={{ data: needs34, type: "needs" }}
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
                      id: "apk.childFuture.currentValue",
                    })}
                  </Flex>
                  <Box css={{ "& input": { width: 392 } }}>
                    <APKCurrencyInput
                      onChange={handleCurrentValueChange}
                      maxValue={9999999}
                      value={props.childFuture.currentValue}
                    />
                  </Box>
                </>
              }
            ></StyledQuestion>
          </Wrapper>
          <Recommendation
            title={intl.formatMessage({
              id: "apk.childFuture.missingValue",
            })}
            amount={props.childFuture.missingValue}
          />
        </>
      }
    />
  );
};

export default ChildFuture;

const StyledQuestion = styled(Question)`
  margin-top: 52px;
  margin-bottom: 0;
`;

const Wrapper = styled(EditableSection)`
  margin: 60px 0 36px;
`;
