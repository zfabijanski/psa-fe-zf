import { connect } from "react-redux";
import { getMeetingsCountsIfNeeded } from "slices/meetings";
import { RootState } from "../../../AppStore";
import History from "./History";

const mapStateToProps = ({ meetings }: RootState) => ({
  meetingsCount: meetings.meetingsCount,
  maxMeetingsCount: meetings.maxMeetingsCount,
});

const mapDispatchToProps = {
  getMeetingsCounts: getMeetingsCountsIfNeeded,
};

export default connect(mapStateToProps, mapDispatchToProps)(History);
