import { connect } from "react-redux";
import { BarChart, areInputsNotEmpty } from "slices/quarterlyIncomeCalculator";
import { RootState } from "../../../../../AppStore";
import Chart from "./Chart";

const getHeightReferenceValue = (data: BarChart) => {
  return Object.values(data).reduce((acc, elt) => {
    const currentSum =
      elt.firstYearProvision +
      elt.monthlyProvision +
      elt.quarterlyBonus +
      elt.reserve;
    return currentSum > acc ? currentSum : acc;
  }, 0);
};

const mapStateToProps = (state: RootState) => {
  const {
    quarterlyIncomeCalculator: { chartData },
  } = state;
  return {
    showChart: areInputsNotEmpty(state.quarterlyIncomeCalculator),
    data: chartData,
    heightReferenceValue: getHeightReferenceValue(chartData),
  };
};

export default connect(mapStateToProps)(Chart);
