import { connect } from "react-redux";
import { previewDocument, toggleDocumentState } from "slices/library";
import { RootState } from "../../../../AppStore";
import DocumentContainer from "./DocumentContainer";

interface IOwnProps {
  documentId: number;
}

const mapStateToProps = ({ library }: RootState, ownProps: IOwnProps) => {
  const { documentId } = ownProps;
  return {
    isPreviewed: library.previewedDocumentId === documentId,
    document: library.documentsMetadata[documentId],
  };
};

const mapDispatchToProps = {
  previewDocument,
  toggleDocumentState,
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentContainer);
