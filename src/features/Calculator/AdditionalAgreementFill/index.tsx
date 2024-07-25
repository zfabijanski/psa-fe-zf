import { connect } from "react-redux";
import { RootState } from "../../../AppStore";
import { getCoversConfigMap } from "../../../utils/selectors";
import { AdditionalAgreementFill } from "./AdditionalAgreementFill";

const mapStateToProps = (state: RootState) => ({
  coversConfigMap: getCoversConfigMap(state),
  coversLimits:
    state.productCoversLimits.items[state.calculator.current.productGuid],
});

export default connect(mapStateToProps)(AdditionalAgreementFill);
