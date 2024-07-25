import { connect } from "react-redux";
import { openModal } from "../../../../../services/apk";
import NeedContainer from "./NeedContainer";

const mapDispatchToProps = { openModal };

export default connect(null, mapDispatchToProps)(NeedContainer);
