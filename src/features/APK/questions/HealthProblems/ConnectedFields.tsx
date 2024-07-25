import { FC } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import styled from "styled-components/macro";
import doubleArrowsLeft from "../../../../assets/icons/apk-arrows/double-arrows-left.svg";
import singleArrowRight from "../../../../assets/icons/apk-arrows/single-arrow-right.svg";
import {
  disabilityData,
  seriousIllnessData,
} from "../../../../common/features/Survey/components/AuxiliaryCalculator/HealthProblemsCalculator/data";
import { Flex } from "../../../../components/UI/Box";
import { ETextAlign } from "../../../../components/UI/Input";
import { ModalInfoIcon } from "../../../../components/UI/ModalInfoIcon";
import PruSwitch from "../../../../components/UI/PruSwitch/PruSwitch";
import { APKHealthProblemsConfig } from "../../APKHealthProblemsConfig";
import { IHealthProblems, ISetQuestionValue } from "../../types";
import APKCurrencyInput from "../commons/APKCurrencyInput";
import Question from "../commons/Question";
import { roundToDecimals } from "utils/transformers";

interface IProps extends ISetQuestionValue {
  healthProblems: IHealthProblems;
}

const ConnectedFields: FC<IProps> = (props) => {
  const intl = useIntl();

  const handleHospitalStayInsuranceSumChange = (value?: number) => {
    props.setQuestionValue("hospitalStayInsuranceSumRecommendedValue", value);

    props.setQuestionValue(
      "hospitalStayForOneDayRecommendedValue",
      value && roundToDecimals(value / 100)
    );
  };

  const handleSeriousIllnessChange = (value?: number) => {
    props.setQuestionValue("seriousIllnessRecommendedValue", value);
  };

  const handleSeriousDisabilityChange = (value?: number) => {
    props.setQuestionValue("seriousDisabilityRecommendedValue", value);
  };

  const handleHospitalStayForOneDayChange = (value?: number) => {
    props.setQuestionValue("hospitalStayForOneDayRecommendedValue", value);
    props.setQuestionValue(
      "hospitalStayInsuranceSumRecommendedValue",
      value && Math.round(value * 100)
    );
  };

  const handleAutoRecalculationChange = (checked?: boolean) => {
    props.setQuestionValue("autoRecalculationEnabled", checked);
  };

  return (
    <Container>
      <hr />
      <StyledQuestion
        fullWidthAnswers={true}
        question={
          <>
            <Flex css={{ alignItems: "center" }}>
              {intl.formatMessage({
                id: "apk.proposedSums",
              })}
              <StyledModalInfoIcon
                width={20}
                modalContent={intl.formatMessage(
                  { id: "apk.healthProblemsInfo" },
                  { br: <br /> }
                )}
              />
            </Flex>
          </>
        }
      ></StyledQuestion>
      <GridContainer>
        <GridArea area="hospitalStayInsuranceSum">
          <Flex css={{ marginBottom: 4 }}>
            {intl.formatMessage({
              id: "apk.healthProblems.hospitalStay",
            })}
          </Flex>
          <Flex css={{ flexDirection: "column", textAlign: "left" }}>
            <APKCurrencyInput
              {...APKHealthProblemsConfig.hospitalStayInsuranceSumValue}
              onChange={handleHospitalStayInsuranceSumChange}
              maxValue={99999}
              disabled={props.healthProblems.autoRecalculationEnabled}
              textAlign={ETextAlign.right}
              value={
                props.healthProblems.hospitalStayInsuranceSumRecommendedValue
              }
              filledDesc={intl.formatMessage({
                id: "apk.insuranceSums",
              })}
              placeholder={intl.formatMessage({
                id: "apk.insuranceSums",
              })}
              labelsCss={{ width: "100%" }}
              validationInfoCss={{ marginBottom: "12px", textAlign: "left" }}
            />
            <APKCurrencyInput
              onChange={handleHospitalStayForOneDayChange}
              maxValue={9999999}
              {...APKHealthProblemsConfig.hospitalStayForOneDayValue}
              value={props.healthProblems.hospitalStayForOneDayRecommendedValue}
              disabled={props.healthProblems.autoRecalculationEnabled}
              textAlign={ETextAlign.right}
              filledDesc={intl.formatMessage({
                id: "apk.healthProblems.forOneDay",
              })}
              placeholder={intl.formatMessage({
                id: "apk.healthProblems.forOneDay",
              })}
              labelsCss={{ width: "100%" }}
              validationInfoCss={{ position: "absolute", textAlign: "left" }}
            />
            {props.healthProblems.autoRecalculationEnabled && (
              <DoubleArrowsLeft />
            )}
          </Flex>
        </GridArea>
        <GridArea area="seriousIllness">
          <APKCurrencyInput
            topLabel={intl.formatMessage({
              id: "apk.healthProblems.seriousIllness",
            })}
            maxValue={9999999}
            {...APKHealthProblemsConfig.seriousIllnessValue}
            onChange={handleSeriousIllnessChange}
            value={props.healthProblems.seriousIllnessRecommendedValue}
            calculatorData={
              !props.healthProblems.autoRecalculationEnabled
                ? {
                    data: seriousIllnessData,
                    type: "healthProblems",
                  }
                : undefined
            }
            labelsCss={{ textAlign: "left", width: "100%" }}
            validationInfoCss={{ position: "absolute" }}
          />
          {props.healthProblems.autoRecalculationEnabled && (
            <SingleArrowRight />
          )}
        </GridArea>
        <GridArea area="seriousDisability">
          <APKCurrencyInput
            topLabel={intl.formatMessage({
              id: "apk.healthProblems.seriousDisability",
            })}
            maxValue={9999999}
            onChange={handleSeriousDisabilityChange}
            {...APKHealthProblemsConfig.seriousDisabilityValue}
            value={props.healthProblems.seriousDisabilityRecommendedValue}
            disabled={props.healthProblems.autoRecalculationEnabled}
            calculatorData={
              !props.healthProblems.autoRecalculationEnabled
                ? {
                    data: disabilityData,
                    type: "healthProblems",
                  }
                : undefined
            }
            labelsCss={{ textAlign: "left", width: "100%" }}
            validationInfoCss={{ position: "absolute" }}
          />
        </GridArea>
        <GridArea area="hospitalStayForOneDay"></GridArea>
      </GridContainer>
      <SwitchContainer>
        <SwitchLabel>
          <FormattedMessage id="apk.healthProblems.autoRecalculation" />
        </SwitchLabel>
        <PruSwitch
          checked={props.healthProblems.autoRecalculationEnabled}
          onValueChange={handleAutoRecalculationChange}
        />
      </SwitchContainer>
    </Container>
  );
};

export default ConnectedFields;

const Container = styled.div`
  position: relative;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas:
    "hospitalStayInsuranceSum seriousIllness seriousDisability"
    "hospitalStayForOneDay . .";
  grid-column-gap: 60px;
  align-items: center;
`;

const GridArea = styled.div<{ area: string }>`
  position: relative;
  grid-area: ${({ area }) => area};

  & label {
    width: 100%;
  }
`;

const SwitchContainer = styled.div`
  margin: 50px auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SwitchLabel = styled.span`
  font-size: 18px;
  margin-right: 10px;
`;

const StyledQuestion = styled(Question)`
  margin-top: 32px;
  margin-bottom: 8px;
`;

const StyledModalInfoIcon = styled(ModalInfoIcon)`
  margin-left: 11px;
`;

const DoubleArrowsLeft = styled.img`
  position: absolute;
  top: 42px;
  left: 100%;
  margin-left: 8px;
`;
DoubleArrowsLeft.defaultProps = {
  src: doubleArrowsLeft,
};

const SingleArrowRight = styled.img`
  position: absolute;
  top: 46px;
  left: 100%;
  margin-left: 8px;
`;
SingleArrowRight.defaultProps = {
  src: singleArrowRight,
};
