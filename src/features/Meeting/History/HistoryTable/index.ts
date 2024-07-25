import { connect } from "react-redux";
import { deleteMeeting, getMeetings, openMeeting } from "slices/meetings";
import { RootState } from "../../../../AppStore";
import HistoryTable from "./HistoryTable";

const mapStateToProps = ({ meetings }: RootState) => ({
  data: meetings.items,
});

const mapDispatchToProps = {
  getMeetings,
  onRowDelete: deleteMeeting,
  onRowSelect: openMeeting,
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryTable);
