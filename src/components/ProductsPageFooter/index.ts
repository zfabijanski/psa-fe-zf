import { connect } from "react-redux";
import { redirectToAp } from "slices/auth";
import { RootState } from "../../AppStore";
import { getCurrentMeeting } from "slices/meetings";
import ProductsPageFooter from "./ProductsPageFooter";

const mapStateToProps = ({ meetings }: RootState) => {
  const currentMeeting = getCurrentMeeting(meetings);
  return {
    haveIdd: currentMeeting ? currentMeeting.haveIdd : false,
  };
};

const mapDispatchToProps = {
  onEAppButtonClick: redirectToAp,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPageFooter);
