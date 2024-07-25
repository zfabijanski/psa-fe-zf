import { connect } from "react-redux";
import { getAttachments, removeDocument } from "slices/mail";
import { RootState } from "../../../../AppStore";
import AttachmentsContainer from "./AttachmentsContainer";

const mapStateToProps = ({ mail }: RootState) => ({
  attachments: mail.attachments,
});

const mapDispatchToProps = {
  onRemove: removeDocument,
  getAttachments,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AttachmentsContainer);
