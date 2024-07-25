import { connect } from "react-redux";
import { openModal } from "../../../../../services/apk";
import { prolongUserSession } from "slices/auth";
import NeedContainer from "./NeedContainer";

const mapDispatchToProps = { openModal, prolongUserSession };

export default connect(null, mapDispatchToProps)(NeedContainer);
