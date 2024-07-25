import { connect } from "react-redux";
import { closeConfirmModal } from "slices/confirmModal";
import SentConfirm from "./SentConfirm";

const mapDispatchToProps = {
  closeConfirmModal,
};

export default connect(null, mapDispatchToProps)(SentConfirm);
