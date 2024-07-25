import { connect } from "react-redux";
import { RootState } from "../../AppStore";
import { getCurrentMeetingClientName } from "slices/meetings";
import LibraryContainer from "./LibraryContainer";

const mapStateToProps = ({ meetings }: RootState) => ({
  clientName: getCurrentMeetingClientName(meetings),
});

export default connect(mapStateToProps)(LibraryContainer);
