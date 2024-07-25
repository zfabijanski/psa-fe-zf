import { FC, useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import styled from "styled-components/macro";
import { addNonBreakingSpaceToNumber } from "../../../../utils/formatters";
import { getSeriousIllnessRecommendedValue } from "../../formulas";
import {
  IHealthProblems,
  INeedContainer,
  ISetQuestionValue,
} from "../../types";
import NeedContainer from "../commons/NeedContainer";
import Recommendation from "../commons/Recommendation";
import { APKTitle, APKTitleBold } from "../commons/APKTitle";
import { EditableSection } from "../commons/UI";
import YourIncome from "../commons/YourIncome";
import ConnectedFields from "./ConnectedFields";

import PatientPicture from "../../../../assets/images/patient-M.jpg";
import { formatCurrency } from "../../../../utils/transformers";

interface IProps extends ISetQuestionValue, INeedContainer {
  income?: number;
  healthProblems: IHealthProblems;
}

const HealthProblems: FC<IProps> = (props) => {
  const intl = useIntl();

  const handleIncomeForCollateralChange = (value?: number) => {
    props.setQuestionValue("incomeForCollateral", value);
  };

  useEffect(() => {
    const { shouldRecalculateSeriousIllness } = props.healthProblems;
    if (props.isExpandable && shouldRecalculateSeriousIllness) {
      const incomeForCollateral =
        props.income !== undefined ? props.income * 12 : undefined;
      props.setQuestionValue("incomeForCollateral", incomeForCollateral);
      props.setQuestionValue(
        "seriousIllnessRecommendedValue",
        incomeForCollateral &&
          getSeriousIllnessRecommendedValue(incomeForCollateral)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props.income,
    props.isExpandable,
    props.healthProblems.shouldRecalculateSeriousIllness,
  ]);

  const formatHealthProblemValue = (value?: number, isExpanded?: boolean) =>
    isExpanded ? "" : addNonBreakingSpaceToNumber(formatCurrency(value));

  const TitleElement = (isExpanded: boolean) => (
    <TitleContainer>
      <APKTitle fontSize="24px" lineHeight="28px">
        {intl.formatMessage({
          id: "apk.healthProblems.seriousIllness",
        })}{" "}
        <APKTitleBold>
          {formatHealthProblemValue(
            props.healthProblems.seriousIllnessRecommendedValue,
            isExpanded
          )}
        </APKTitleBold>
      </APKTitle>
      <APKTitle fontSize="24px" lineHeight="28px">
        {intl.formatMessage({
          id: "apk.healthProblems.seriousDisability",
        })}{" "}
        <APKTitleBold>
          {formatHealthProblemValue(
            props.healthProblems.seriousDisabilityRecommendedValue,
            isExpanded
          )}
        </APKTitleBold>
      </APKTitle>
      <APKTitle fontSize="24px" lineHeight="28px">
        {intl.formatMessage({
          id: "apk.healthProblems.hospitalStay",
        })}{" "}
        <APKTitleBold>
          {formatHealthProblemValue(
            props.healthProblems.hospitalStayInsuranceSumRecommendedValue,
            isExpanded
          )}
        </APKTitleBold>
      </APKTitle>
    </TitleContainer>
  );
  return (
    <NeedContainer
      moveValueToCalculator={props.healthProblems.moveValueToCalculator}
      setQuestionValue={props.setQuestionValue}
      titleElement={TitleElement}
      isExpandable={props.isExpandable}
      image={PatientPicture}
      expandableElement={
        <div>
          <EditableSection>
            <YourIncome
              income={props.income}
              incomeForCollateral={props.healthProblems.incomeForCollateral}
              onIncomeForCollateralChange={handleIncomeForCollateralChange}
            />
            <ConnectedFields {...props} />
          </EditableSection>
          <Recommendation
            textAlign="left"
            title={intl.formatMessage({
              id: "apk.lifeInsurance.recommendedValue",
            })}
            amount={props.healthProblems.seriousIllnessRecommendedValue}
          >
            <RecommendationTitle>
              <FormattedMessage id={"apk.healthProblems.recommendedValues"} />
            </RecommendationTitle>
            <RecommendationList>
              <li>
                <FormattedMessage
                  id={"apk.healthProblems.fromSeriousIllness"}
                />
                <BoldList>
                  {formatCurrency(
                    props.healthProblems.seriousIllnessRecommendedValue
                  )}
                </BoldList>
              </li>
              <li>
                <FormattedMessage
                  id={"apk.healthProblems.fromSeriousDisability"}
                />
                <BoldList>
                  {formatCurrency(
                    props.healthProblems.seriousDisabilityRecommendedValue
                  )}
                </BoldList>
              </li>
              <li>
                <FormattedMessage id={"apk.healthProblems.fromHospitalStay"} />
                <BoldList>
                  {formatCurrency(
                    props.healthProblems
                      .hospitalStayInsuranceSumRecommendedValue
                  )}
                </BoldList>
                <InfoWrapper>
                  {!!props.healthProblems
                    .hospitalStayForOneDayRecommendedValue && (
                    <FormattedMessage
                      id="apk.healthProblems.fromHospitalStayPerOneDay"
                      values={{
                        value:
                          props.healthProblems
                            .hospitalStayForOneDayRecommendedValue,
                      }}
                    />
                  )}
                </InfoWrapper>
              </li>
            </RecommendationList>
          </Recommendation>
        </div>
      }
    />
  );
};

export default HealthProblems;

const TitleContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-right: 110px;
  max-width: 640px;
  margin-bottom: -24px;

  h2 {
    margin-bottom: 0;
  }

  span {
    display: block;
    max-width: 167px;
    min-height: 33px;
  }
`;

const RecommendationTitle = styled.div`
  font-size: 20px;
  line-height: 24px;
`;

const RecommendationList = styled.ul`
  font-size: 20px;
  line-height: 24px;
  margin-top: 4px;
  margin-bottom: 0;
  > li:not(:last-child) {
    margin-bottom: 4px;
  }
`;

const BoldList = styled.span`
  font-weight: 600;
`;

const InfoWrapper = styled.span`
  font-size: 16px;
  line-height: 20px;
`;
