import { connect } from "react-redux";
import { RootState } from "../../../AppStore";
import { getCurrentCalculationState } from "slices/calculator";
import { MainCoverExtension } from "./MainCoverExtension";

const mapStateToProps = (state: RootState) => {
  const { status } = getCurrentCalculationState(state.calculator);
  return {
    calculationStatus: status,
  };
};

export default connect(mapStateToProps)(MainCoverExtension);
