import React, { useEffect } from "react";
import PageLayout from "../../../layouts/PageLayout";

interface IProps {
  closeConfirmModal: () => void;
}

const SentConfirm: React.FC<IProps> = (props) => {
  useEffect(() => () => props.closeConfirmModal());

  return <PageLayout pageName="mail.title" />;
};

export default SentConfirm;
