import { connect } from "react-redux";
import {
  getMeetingsCountsIAndWarnIfNeeded,
  validateAndAddMeeting,
} from "slices/meetings";
import { RootState } from "../../../AppStore";
import { isFullscreenSpinnerRequested } from "slices/fullscreenSpinner";
import Start from "./Start";
import { RoutePath } from "utils/router";

const mapStateToProps = ({ fullscreenSpinner }: RootState) => ({
  isFullscreenSpinnerRequested: isFullscreenSpinnerRequested(fullscreenSpinner),
});

const mapDispatchToProps = {
  validateAndAddMeeting(clientName: string, redirectTo: RoutePath) {
    return validateAndAddMeeting({ clientName, redirectTo });
  },
  getMeetingsCountsAndWarnIfNeeded: getMeetingsCountsIAndWarnIfNeeded,
};

export default connect(mapStateToProps, mapDispatchToProps)(Start);
