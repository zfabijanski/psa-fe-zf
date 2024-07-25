import React from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { PruLabel } from "../../../../components/UI/PruLabel";
import Sidebar from "../../../../components/UI/Sidebar";
import { IAttachment } from "../../types";
import Attachment from "./Attachment";
import { Icon } from "components/UI/Icon";

interface IProps {
  attachments: IAttachment[];
  onRemove: (attachmentId: number) => void;
  onAttachmentsAdd: () => void;
}

const AttachmentsHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

const Attachments = ({ attachments, onRemove, onAttachmentsAdd }: IProps) => {
  const handleRemoveClick = (attachmentId: number) => () => {
    onRemove(attachmentId);
  };

  return (
    <Sidebar
      fixedSection={
        <AttachmentsHeader>
          <PruLabel>
            <FormattedMessage id="mail.label.attachments" />
          </PruLabel>
          <Icon
            name="plus"
            style={{ cursor: "pointer" }}
            onClick={onAttachmentsAdd}
          />
        </AttachmentsHeader>
      }
      scrollableSection={
        <>
          {attachments.map((attachment) => (
            <Attachment
              key={attachment.id}
              name={attachment.name}
              isRemovable={attachment.isRemovable}
              isStateChanging={attachment.isStateChanging}
              onRemoveClick={handleRemoveClick(attachment.id)}
            />
          ))}
        </>
      }
    />
  );
};

export default Attachments;
