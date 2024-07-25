import { connect } from "react-redux";
import { goToProducts, repeatQuestionnaire } from "../../../services/reportBop";
import { RootState } from "../../../AppStore";
import Report from "./Report";
import { hideFullscreenSpinner } from "slices/fullscreenSpinner";

const mapStateToProps = ({ illustrations }: RootState) => {
  return {
    adequacyId: illustrations.items[0].adequacy_id || 0,
  };
};

const mapDispatchToProps = {
  repeatQuestionnaire,
  goToProducts,
  hideFullscreenSpinner,
};

export default connect(mapStateToProps, mapDispatchToProps)(Report);
