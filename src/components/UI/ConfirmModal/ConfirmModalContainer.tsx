import { connect } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";

import throttle from "lodash/throttle";

import { closeConfirmModal, IConfirmModalOptions } from "slices/confirmModal";
import { RootState } from "../../../AppStore";
import ConfirmModal from "./ConfirmModal";

const mapStateToProps = ({ confirmModal }: RootState) => ({
  options: confirmModal.options,
});

interface IConfirmModalProps {
  options: IConfirmModalOptions | null;
  dispatch: Dispatch;
}

const ConfirmModalContainer = ({ options, dispatch }: IConfirmModalProps) => {
  const handleConfirm = throttle(
    () => {
      dispatch(closeConfirmModal());
      if (options && options.onConfirm) {
        options.onConfirm();
      }
    },
    2000,
    { leading: true, trailing: false }
  );

  const handleCancel = throttle(
    () => {
      dispatch(closeConfirmModal());
      if (options && options.onCancel) {
        options.onCancel();
      }
    },
    2000,
    { leading: true, trailing: false }
  );

  return (
    <>
      {!!options && (
        <ConfirmModal
          {...options}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

export default connect(mapStateToProps)(ConfirmModalContainer);
