import React from "react";
import PageLayout from "../../../layouts/PageLayout";
import { goBack } from "../../../utils/router";
import Message from "./Message";

interface IProps {
  validateAndSendMail: () => void;
}

const MessageContainer: React.FC<IProps> = (props) => {
  const handlePrevClick = () => goBack();

  return (
    <PageLayout
      pageName="mail.title"
      footer={{
        leftSection: [{ config: "prevButtonConfig", onClick: handlePrevClick }],
        rightSection: [
          {
            config: "getArrowNextConfig",
            message: "bottomButtonBar.send",
            onClick: props.validateAndSendMail,
          },
        ],
      }}
    >
      <Message />
    </PageLayout>
  );
};

export default MessageContainer;
