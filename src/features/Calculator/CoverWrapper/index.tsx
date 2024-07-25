import { connect } from "react-redux";
import { RootState } from "../../../AppStore";
import { getCurrentCalculationState } from "slices/calculator";
import { CoverWrapper } from "./CoverWrapper";

const mapStateToProps = (state: RootState) => {
  const { status, calculationFeatureChanged } = getCurrentCalculationState(
    state.calculator
  );
  return {
    calculationStatus: status,
    calculationFeatureChanged,
  };
};

export default connect(mapStateToProps)(CoverWrapper);
