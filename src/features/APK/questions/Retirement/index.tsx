import { FC } from "react";
import { useIntl } from "react-intl";
import {
  IIncomeSource,
  INeedContainer,
  IRetirement,
  ISetQuestionValue,
} from "../../types";
import NeedContainer from "../commons/NeedContainer";
import Question from "../commons/Question";
import Recommendation from "../commons/Recommendation";
import { APKTitle, APKTitleBold } from "../commons/APKTitle";
import { EditableSection, QuestionsContainer } from "../commons/UI";
import IncreasedBy from "./IncreasedBy";
import PensionGap from "./PensionGap";

import RetirementPicture from "../../../../assets/images/old-couple-M.jpg";
import { Box } from "../../../../components/UI/Box";
import { DurationSelect } from "../../../../components/UI/DurationSelect";
import { formatCurrency } from "../../../../utils/transformers";

interface IProps extends ISetQuestionValue, INeedContainer {
  income?: number;
  incomeSource?: IIncomeSource;
  retirement: IRetirement;
}

const Retirement: FC<IProps> = (props) => {
  const intl = useIntl();

  const handleDurationChange = (value?: string | number) => {
    props.setQuestionValue("duration", value);
  };

  const TitleElement = (isExpanded: boolean) => (
    <APKTitle>
      {intl.formatMessage({ id: "apk.retirement" })}{" "}
      <APKTitleBold>
        {isExpanded
          ? undefined
          : formatCurrency(props.retirement.recommendedValue)}
      </APKTitleBold>
    </APKTitle>
  );

  return (
    <NeedContainer
      moveValueToCalculator={props.retirement.moveValueToCalculator}
      setQuestionValue={props.setQuestionValue}
      titleElement={TitleElement}
      isExpandable={props.isExpandable}
      image={RetirementPicture}
      expandableElement={
        <div>
          <EditableSection>
            <QuestionsContainer>
              {props.incomeSource !== "unemployed" && (
                <PensionGap
                  incomeValue={props.income}
                  pension={props.retirement.pension}
                  gap={props.retirement.gap}
                />
              )}
              <IncreasedBy
                pension={props.retirement.pension}
                setQuestionValue={props.setQuestionValue}
                increasedByValue={props.retirement.increasedBy}
              />
              <Question
                question={
                  <>
                    {intl.formatMessage({
                      id: "apk.retirement.duration",
                    })}

                    <Box css={{ width: 392 }}>
                      <DurationSelect
                        value={props.retirement.duration ?? ""}
                        onChange={handleDurationChange}
                        minValue={1}
                        maxValue={60}
                        labelProps={{}}
                      />
                    </Box>
                  </>
                }
              ></Question>
            </QuestionsContainer>
          </EditableSection>
          <Recommendation
            title={intl.formatMessage({
              id: "apk.retirement.recommendedValue",
            })}
            amount={props.retirement.recommendedValue}
          />
        </div>
      }
    />
  );
};

export default Retirement;
