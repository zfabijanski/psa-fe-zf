import { connect } from "react-redux";
import { saveAPK } from "slices/illustrations";
import { RootState } from "../../AppStore";
import APK from "./APK";

const mapStateToProps = ({ illustrations }: RootState) => ({
  apk: illustrations.items[0]
    ? illustrations.items[0].json_needs_analysis
    : null,
});

const mapDispatchToProps = {
  saveAPK,
};

export default connect(mapStateToProps, mapDispatchToProps)(APK);
