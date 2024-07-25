import React from "react";
import { IDocumentMetadata } from "../../types";
import Document from "./Document";

interface IProps {
  document: IDocumentMetadata;
  previewDocument: (documentId: number) => void;
  toggleDocumentState: (documentId: number) => void;
  isPreviewed: boolean;
}

const DocumentContainer: React.FC<IProps> = (props) => {
  const handlePreviewClick = () =>
    props.previewDocument(props.document.documentId);
  const handleActionClick = () =>
    props.toggleDocumentState(props.document.documentId);

  return (
    <Document
      name={props.document.name}
      state={props.document.state}
      isStateChanging={props.document.isStateChanging}
      isPreviewed={props.isPreviewed}
      onPreviewClick={handlePreviewClick}
      onActionClick={handleActionClick}
    />
  );
};

export default DocumentContainer;
