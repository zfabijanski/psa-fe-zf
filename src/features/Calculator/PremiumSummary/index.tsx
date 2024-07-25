import { connect } from "react-redux";
import { CalculationStatus } from "models/calculator";
import { RootState } from "../../../AppStore";
import { getCalculationId, getCalculationStatus } from "../utils";
import { PremiumSummary } from "./PremiumSummary";

const mapStateToProps = (state: RootState) => {
  const {
    calculator: {
      calculations,
      current: { productGuid, index },
      calculationsState,
    },
  } = state;
  const calculationId = getCalculationId(calculations[productGuid][index]);
  return {
    outOfDate:
      getCalculationStatus(calculationsState, calculationId) ===
      CalculationStatus.Invalid,
  };
};

export default connect(mapStateToProps)(PremiumSummary);
