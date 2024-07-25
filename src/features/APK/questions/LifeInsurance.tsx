import { FC, useEffect } from "react";
import { useIntl } from "react-intl";
import styled from "styled-components/macro";
import { ILifeInsurance, INeedContainer, ISetQuestionValue } from "../types";
import APKCurrencyInput from "./commons/APKCurrencyInput";
import NeedContainer from "./commons/NeedContainer";
import Question from "./commons/Question";
import Recommendation from "./commons/Recommendation";
import { APKTitle, APKTitleBold } from "./commons/APKTitle";
import { EditableSection } from "./commons/UI";
import YourIncome from "./commons/YourIncome";

import LifeInsurancePicture from "../../../assets/images/couple-M.jpg";
import { Box, Flex } from "../../../components/UI/Box";
import { DurationSelect } from "../../../components/UI/DurationSelect";
import { formatCurrency } from "../../../utils/transformers";

interface IProps extends ISetQuestionValue, INeedContainer {
  income?: number;
  lifeInsurance: ILifeInsurance;
}

const LifeInsurance: FC<IProps> = (props) => {
  const intl = useIntl();

  useEffect(() => {
    const { shouldRecalculateIncomeForCollateral } = props.lifeInsurance;
    if (props.isExpandable && shouldRecalculateIncomeForCollateral) {
      props.setQuestionValue(
        "incomeForCollateral",
        props.income !== undefined ? props.income * 12 : undefined
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.income, props.isExpandable]);

  const handleIncomeForCollateralChange = (value?: number) => {
    props.setQuestionValue("incomeForCollateral", value);
  };

  const handleDurationChange = (value?: string | number) => {
    props.setQuestionValue("duration", value);
  };

  const handleCommitmentValueChange = (value?: number) => {
    props.setQuestionValue("commitmentValue", value);
  };

  const TitleElement = (isExpanded: boolean) => (
    <APKTitle>
      {intl.formatMessage({ id: "apk.lifeInsurance" })}{" "}
      <APKTitleBold>
        {isExpanded ? "" : formatCurrency(props.lifeInsurance.recommendedValue)}
      </APKTitleBold>
    </APKTitle>
  );

  return (
    <NeedContainer
      moveValueToCalculator={props.lifeInsurance.moveValueToCalculator}
      setQuestionValue={props.setQuestionValue}
      titleElement={TitleElement}
      isExpandable={props.isExpandable}
      image={LifeInsurancePicture}
      expandableElement={
        <>
          <EditableSection>
            <YourIncome
              income={props.income}
              incomeForCollateral={props.lifeInsurance.incomeForCollateral}
              onIncomeForCollateralChange={handleIncomeForCollateralChange}
            />
            <StyledQuestion
              fullWidthAnswers={true}
              question={
                <>
                  <Flex css={{ alignItems: "center" }}>
                    {intl.formatMessage({
                      id: "apk.lifeInsurance.duration",
                    })}
                  </Flex>
                  <Box css={{ "& input": { width: 348 } }}>
                    <DurationSelect
                      value={props.lifeInsurance.duration ?? ""}
                      onChange={handleDurationChange}
                      minValue={1}
                      maxValue={20}
                      labelProps={{}}
                    />
                  </Box>
                </>
              }
            ></StyledQuestion>
            <StyledQuestion
              fullWidthAnswers={true}
              question={
                <>
                  <Flex css={{ alignItems: "center" }}>
                    {intl.formatMessage({
                      id: "apk.lifeInsurance.commitmentValue",
                    })}
                  </Flex>
                  <Box css={{ "& input": { width: 392 } }}>
                    <APKCurrencyInput
                      onChange={handleCommitmentValueChange}
                      maxValue={999999999}
                      value={props.lifeInsurance.commitmentValue}
                    />
                  </Box>
                </>
              }
            ></StyledQuestion>
          </EditableSection>
          <Recommendation
            title={intl.formatMessage({
              id: "apk.lifeInsurance.recommendedValue",
            })}
            amount={props.lifeInsurance.recommendedValue}
          />
        </>
      }
    />
  );
};

export default LifeInsurance;

const StyledQuestion = styled(Question)`
  margin-top: 30px;
`;
