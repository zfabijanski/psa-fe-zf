import { connect } from "react-redux";
import { InputId } from "slices/quarterlyIncomeCalculator";
import {
  resetChartValues,
  setChartDataValues,
  setPercentageBonusAndIncome,
} from "slices/quarterlyIncomeCalculator";
import { RootState } from "../../../../AppStore";
import { getIntFromString } from "../../../../utils/getIntFromString";
import QuarterlyIncomeCalculator from "./QuarterlyIncomeCalculator";

const mapStateToProps = ({
  quarterlyIncomeCalculator: { inputData },
}: RootState) => {
  return {
    duration: getIntFromString(inputData[InputId.Duration].value),
    colaborationMonth: getIntFromString(inputData[InputId.Month].value),
    policyNumber: getIntFromString(inputData[InputId.Policy].value),
    APEperPolicy: getIntFromString(inputData[InputId.APE].value),
  };
};

const mapDispatchToProps = {
  setChartDataValues(
    firstYearCommisionWithoutReserve: number,
    bonus1: number,
    bonus2: number,
    bonus3: number,
    individualCommisionPercentage: number,
    halfReserve: number
  ) {
    return setChartDataValues({
      firstYearCommisionWithoutReserve,
      bonus1,
      bonus2,
      bonus3,
      individualCommisionPercentage,
      halfReserve,
    });
  },
  setPercentageBonusAndIncome(percentageBonus: number, income: number) {
    return setPercentageBonusAndIncome({ percentageBonus, income });
  },
  resetChartValues,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuarterlyIncomeCalculator);
