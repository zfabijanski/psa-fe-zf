import { connect } from "react-redux";
import { editMail } from "slices/mail";
import MailFormalInfo from "./MailFormalInfo";

const mapDispatchToProps = {
  acceptFormalInfo: editMail,
};

export default connect(null, mapDispatchToProps)(MailFormalInfo);
