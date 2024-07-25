import { connect } from "react-redux";
import { showModal } from "slices/modal";
import { ThunkResult } from "../../../../../AppStore";
import BasicProvision from "./BasicCommission";

const openModal =
  (message: string): ThunkResult =>
  (dispatch) => {
    dispatch(showModal({ modalHtml: message }));
  };

const mapDispatchToProps = { openModal };

export default connect(null, mapDispatchToProps)(BasicProvision);
