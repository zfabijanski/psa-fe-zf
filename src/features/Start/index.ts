import { connect } from "react-redux";
import { resetIllustrations } from "slices/illustrations";
import { resetDocuments } from "slices/library";
import { resetMail } from "slices/mail";
import {
  addMeeting,
  clearCurrentMeeting,
  getMeetingsCountsIfNeeded,
} from "slices/meetings";
import { showModal } from "slices/modal";
import { resetProducts } from "slices/products";
import { RootState } from "AppStore";
import { canAddMeeting } from "slices/meetings";
import Start from "./Start";
import { RoutePath } from "utils/router";
import { resetCalculatorState } from "slices/calculator";

const mapStateToProps = ({ meetings, auth }: RootState) => ({
  canAddMeeting: canAddMeeting(meetings),
  brand: auth.info && auth.info.brand,
});

const mapDispatchToProps = {
  showModal,
  getMeetingsCounts: getMeetingsCountsIfNeeded,
  clearCurrentMeeting,
  resetDocuments,
  resetMail,
  addMeeting(clientName: string, redirectTo: RoutePath) {
    return addMeeting({ clientName, redirectTo });
  },
  resetProducts,
  resetIllustrations,
  resetCalculatorState,
};

export default connect(mapStateToProps, mapDispatchToProps)(Start);
