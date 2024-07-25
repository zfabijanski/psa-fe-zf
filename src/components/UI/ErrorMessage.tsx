import React from "react";
import { MessageDescriptor } from "react-intl";
import ConfirmModal from "./ConfirmModal/ConfirmModal";

interface IProps {
  message: string | MessageDescriptor;
}

export const ErrorMessage: React.FC<IProps> = (props) => (
  <ConfirmModal
    message={props.message}
    showBackdrop={true}
    showConfirm={false}
  />
);

export default ErrorMessage;
