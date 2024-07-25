import { connect } from "react-redux";
import {
  setCalculationStatus,
  getCurrentCalculationId,
} from "slices/calculator";
import { RootState } from "../../../AppStore";
import { getCoversForCurrentProduct } from "../../../utils/selectors";
import { ChildrenSection } from "./ChildrenSection";
import { CalculationStatus } from "models/calculator";

const mapStateToProps = (state: RootState) => ({
  childCovers: getCoversForCurrentProduct(state).childCovers,
  currentCalculationId: getCurrentCalculationId(state.calculator),
});

const mapDispatchToProps = {
  setCalculationStatus(calculationId: number, status: CalculationStatus) {
    return setCalculationStatus({ calculationId, status });
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(ChildrenSection);
