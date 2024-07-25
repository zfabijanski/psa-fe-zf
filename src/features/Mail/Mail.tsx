import React from "react";
import { MailStatus } from "slices/mail";
import MailFormalInfo from "./MailFormalInfo";
import Message from "./Message";
import SentConfirm from "./SentConfirm";

interface IProps {
  status: MailStatus;
}

const Mail: React.FC<IProps> = (props) => {
  switch (props.status) {
    case MailStatus.FormalInfoNotAccepted:
      return <MailFormalInfo />;
    case MailStatus.Editing:
    case MailStatus.Sending:
      return <Message />;
    case MailStatus.SentSuccess:
    case MailStatus.SentFailure:
      return <SentConfirm />;
    default:
      return <></>;
  }
};

export default Mail;
