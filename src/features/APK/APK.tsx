import React from "react";
import styled from "styled-components";
import PageLayout from "../../layouts/PageLayout";
import { goBack, memoryHistory, redirect } from "../../utils/router";
import { IAPK } from "../Products/types";
import {
  calculateChildFutureMissingValue,
  calculateHealthProblemsAutoCalculatedValues,
  calculateLifeInsuranceValue,
  calculateRetirementPensionAndGap,
  calculateRetirementRecommendedValue,
  calculateSavingsMissingValue,
  getSeriousIllnessRecommendedValue,
} from "./formulas";
import ChildFuture from "./questions/ChildFuture";
import HealthProblems from "./questions/HealthProblems";
import LifeInsurance from "./questions/LifeInsurance";
import PreliminaryQuestions from "./questions/Preliminary";
import Retirement from "./questions/Retirement";
import Savings from "./questions/Savings";

interface IProps {
  apk: IAPK | null;
  saveAPK: (state: IAPK) => void;
}

interface IState {
  apk: IAPK;
  preliminaryQuestionsAnsweredOnce: boolean;
}

class APK extends React.Component<IProps, IState> {
  public state: IState = {
    apk: {
      version: "1.0.0",
      preliminary: {},
      lifeInsurance: {
        moveValueToCalculator: true,
        duration: 3,
        shouldRecalculateIncomeForCollateral: true,
      },
      healthProblems: {
        autoRecalculationEnabled: true,
        moveValueToCalculator: true,
        shouldRecalculateSeriousIllness: true,
      },
      savings: { moveValueToCalculator: true },
      childFuture: { moveValueToCalculator: true },
      retirement: {
        duration: 20,
        moveValueToCalculator: true,
      },
    },
    preliminaryQuestionsAnsweredOnce: false,
  };

  private goToProducts = () => {
    redirect("/meeting");
  };

  private apkOpenedFromProducts =
    memoryHistory.entries[memoryHistory.entries.length - 2].pathname !==
    "/create";

  private arePreliminaryQuestionsAnswered = () => {
    return (
      this.state.apk.preliminary.incomeValue !== undefined &&
      this.state.apk.preliminary.incomeSource !== undefined
    );
  };

  public componentDidMount = () => {
    if (this.props.apk) {
      this.setState({
        apk: {
          ...this.props.apk,
          lifeInsurance: {
            ...this.props.apk.lifeInsurance,
            shouldRecalculateIncomeForCollateral:
              this.props.apk.lifeInsurance
                .shouldRecalculateIncomeForCollateral === undefined,
          },
          healthProblems: {
            ...this.props.apk.healthProblems,
            shouldRecalculateSeriousIllness:
              this.props.apk.healthProblems.seriousIllnessRecommendedValue ===
              undefined,
          },
        },
      });
      if (this.arePreliminaryQuestionsAnswered()) {
        this.setState({ preliminaryQuestionsAnsweredOnce: true });
      }
    }
  };

  public componentDidUpdate = (prevProps: Readonly<IProps>) => {
    if (prevProps.apk !== this.props.apk) {
      this.setState({ apk: { ...this.props.apk, ...this.state.apk } });
    }
  };

  public componentWillUnmount(): void {
    if (this.arePreliminaryQuestionsAnswered()) {
      this.props.saveAPK(this.state.apk);
    }
  }

  private handlePreliminaryChange = (
    question: string,
    value?: string | number | boolean
  ) => {
    this.setState((prevState) => {
      const stateAfterSettingQuestionValue =
        this.getStateAfterSettingQuestionValue("preliminary", prevState)(
          question,
          value
        );
      return {
        preliminaryQuestionsAnsweredOnce:
          stateAfterSettingQuestionValue.preliminaryQuestionsAnsweredOnce
            ? true
            : stateAfterSettingQuestionValue.apk.preliminary.incomeSource !==
                undefined &&
              stateAfterSettingQuestionValue.apk.preliminary.incomeValue !==
                undefined,
        apk: {
          ...stateAfterSettingQuestionValue.apk,
          retirement: {
            ...stateAfterSettingQuestionValue.apk.retirement,
            ...calculateRetirementPensionAndGap(
              stateAfterSettingQuestionValue.apk.preliminary
            ),
          },
          healthProblems: {
            ...stateAfterSettingQuestionValue.apk.healthProblems,
            shouldRecalculateSeriousIllness:
              question === "incomeValue"
                ? true
                : stateAfterSettingQuestionValue.apk.healthProblems
                    .shouldRecalculateSeriousIllness,
          },
          lifeInsurance: {
            ...stateAfterSettingQuestionValue.apk.lifeInsurance,
            shouldRecalculateIncomeForCollateral:
              question === "incomeValue"
                ? true
                : stateAfterSettingQuestionValue.apk.lifeInsurance
                    .shouldRecalculateIncomeForCollateral,
          },
        },
      };
    });
  };

  private handleLifeInsuranceChange = (
    question: string,
    value?: string | number | boolean
  ) => {
    this.setState((prevState) => {
      const sectionName = "lifeInsurance";
      const stateAfterSettingQuestionValue =
        this.getStateAfterSettingQuestionValue(sectionName, prevState)(
          question,
          value
        );

      return this.getStateWithCalculatedValue(
        sectionName,
        calculateLifeInsuranceValue,
        stateAfterSettingQuestionValue,
        "recommendedValue"
      );
    });
  };

  private handleOnSavingsChange = (
    question: string,
    value?: string | number | boolean
  ) => {
    this.setState((prevState) => {
      const sectionName = "savings";
      const stateAfterSettingQuestionValue =
        this.getStateAfterSettingQuestionValue(sectionName, prevState)(
          question,
          value
        );

      return this.getStateWithCalculatedValue(
        sectionName,
        calculateSavingsMissingValue,
        stateAfterSettingQuestionValue,
        "missingValue"
      );
    });
  };

  private handleChildFutureChange = (
    question: string,
    value?: string | number | boolean
  ) => {
    this.setState((prevState) => {
      const sectionName = "childFuture";
      const stateAfterSettingQuestionValue =
        this.getStateAfterSettingQuestionValue(sectionName, prevState)(
          question,
          value
        );

      return this.getStateWithCalculatedValue(
        sectionName,
        calculateChildFutureMissingValue,
        stateAfterSettingQuestionValue,
        "missingValue"
      );
    });
  };

  private handleRetirementChange = (
    question: string,
    value?: string | number | boolean
  ) => {
    this.setState((prevState) => {
      const sectionName = "retirement";
      const stateAfterSettingQuestionValue =
        this.getStateAfterSettingQuestionValue(sectionName, prevState)(
          question,
          value
        );

      return this.getStateWithCalculatedValue(
        sectionName,
        calculateRetirementRecommendedValue,
        stateAfterSettingQuestionValue,
        "recommendedValue"
      );
    });
  };

  private handleHealthProblemsChange = (
    question: string,
    value?: string | number | boolean
  ) => {
    this.setState((prevState) => {
      const sectionName = "healthProblems";
      const stateAfterSettingQuestionValue =
        this.getStateAfterSettingQuestionValue(sectionName, prevState)(
          question,
          value
        );
      const {
        autoRecalculationEnabled,
        seriousIllnessRecommendedValue: currentSeriousIllnessRecommendedValue,
      } = stateAfterSettingQuestionValue.apk.healthProblems;
      const seriousIllnessRecommendedValue =
        question === "incomeForCollateral" && value !== undefined
          ? getSeriousIllnessRecommendedValue(value as number)
          : currentSeriousIllnessRecommendedValue;

      if (
        autoRecalculationEnabled &&
        currentSeriousIllnessRecommendedValue !== undefined
      ) {
        return {
          ...stateAfterSettingQuestionValue,
          apk: {
            ...stateAfterSettingQuestionValue.apk,
            healthProblems: {
              ...stateAfterSettingQuestionValue.apk.healthProblems,
              ...calculateHealthProblemsAutoCalculatedValues(
                seriousIllnessRecommendedValue
              ),
              seriousIllnessRecommendedValue,
            },
          },
        };
      } else {
        return {
          ...stateAfterSettingQuestionValue,
          apk: {
            ...stateAfterSettingQuestionValue.apk,
            healthProblems: {
              ...stateAfterSettingQuestionValue.apk.healthProblems,
              seriousIllnessRecommendedValue,
            },
          },
        };
      }
    });
  };

  private getStateWithCalculatedValue = <T extends keyof Omit<IAPK, "version">>(
    sectionName: T,
    algorithm: (value: IAPK[T]) => number | undefined,
    prevState: Readonly<IState>,
    question: string
  ) => {
    return this.getStateAfterSettingQuestionValue(sectionName, prevState)(
      question,
      algorithm(prevState.apk[sectionName])
    );
  };

  private getStateAfterSettingQuestionValue =
    (section: keyof Omit<IAPK, "version">, prevState: Readonly<IState>) =>
    (question: string, value?: string | number | boolean) => {
      return {
        ...prevState,
        apk: {
          ...prevState.apk,
          [section]: {
            ...prevState.apk[section],
            [question]: value,
          },
        },
      };
    };

  private isNeedExpandable = () => {
    return (
      this.arePreliminaryQuestionsAnswered() ||
      this.state.preliminaryQuestionsAnsweredOnce
    );
  };

  public render() {
    return (
      <PageLayout
        pageName="apk.title"
        footer={{
          leftSection: this.apkOpenedFromProducts && [
            { config: "prevButtonConfig", onClick: goBack },
          ],
          rightSection: [
            {
              config: "getArrowNextConfig",
              message: "bottomButtonBar.products",
              onClick: this.goToProducts,
            },
          ],
        }}
      >
        <QuestionsContainer>
          <PreliminaryQuestions
            setQuestionValue={this.handlePreliminaryChange}
            preliminary={this.state.apk.preliminary}
          />
          <Retirement
            income={this.state.apk.preliminary.incomeValue}
            incomeSource={this.state.apk.preliminary.incomeSource}
            retirement={this.state.apk.retirement}
            setQuestionValue={this.handleRetirementChange}
            isExpandable={this.isNeedExpandable()}
          />
          <LifeInsurance
            income={this.state.apk.preliminary.incomeValue}
            lifeInsurance={this.state.apk.lifeInsurance}
            setQuestionValue={this.handleLifeInsuranceChange}
            isExpandable={this.isNeedExpandable()}
          />
          <HealthProblems
            income={this.state.apk.preliminary.incomeValue}
            healthProblems={this.state.apk.healthProblems}
            setQuestionValue={this.handleHealthProblemsChange}
            isExpandable={this.isNeedExpandable()}
          />
          <Savings
            savings={this.state.apk.savings}
            setQuestionValue={this.handleOnSavingsChange}
            isExpandable={this.isNeedExpandable()}
          />
          <ChildFuture
            childFuture={this.state.apk.childFuture}
            setQuestionValue={this.handleChildFutureChange}
            isExpandable={this.isNeedExpandable()}
          />
        </QuestionsContainer>
      </PageLayout>
    );
  }
}

export default APK;

const QuestionsContainer = styled.div`
  max-width: 1232px;
  width: 100%;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  margin: 80px auto;
`;
