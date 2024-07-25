import { connect } from "react-redux";
import { validateAndSendMail, MailStatus } from "slices/mail";
import { RootState } from "../../../AppStore";
import MessageContainer from "./MessageContainer";

const mapStateToProps = ({ mail }: RootState) => ({
  isMailSent: mail.status === MailStatus.SentSuccess,
});

const mapDispatchToProps = {
  validateAndSendMail,
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageContainer);
