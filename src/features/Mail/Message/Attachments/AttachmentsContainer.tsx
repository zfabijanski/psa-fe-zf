import React, { useLayoutEffect } from "react";
import { redirect } from "../../../../utils/router";
import { IAttachment } from "../../types";
import Attachments from "./Attachments";

interface IProps {
  attachments: IAttachment[];
  onRemove: (attachmentId: number) => void;
  getAttachments: () => void;
}

const AttachmentsContainer = (props: IProps) => {
  useLayoutEffect(() => {
    props.getAttachments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAttachmentAdd = () => {
    redirect("/library");
  };

  return <Attachments {...props} onAttachmentsAdd={handleAttachmentAdd} />;
};

export default AttachmentsContainer;
