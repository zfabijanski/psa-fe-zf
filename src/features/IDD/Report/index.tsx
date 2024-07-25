import { connect } from "react-redux";
import { goToProducts, repeatQuestionnaire } from "../../../services/reportIdd";
import { RootState } from "../../../AppStore";
import Report from "./Report";

const mapStateToProps = ({ illustrations }: RootState) => {
  return {
    iddId: illustrations.items[0].idd_id || 0,
  };
};

const mapDispatchToProps = {
  repeatQuestionnaire,
  goToProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Report);
