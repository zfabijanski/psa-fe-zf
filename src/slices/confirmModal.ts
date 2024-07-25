import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { ReactNode } from "react";
import { MessageDescriptor } from "react-intl";
import { TranslationValue } from "utils/types";

export enum Variant {
  Confirm = "Confirm",
  Deny = "Deny",
}

export interface IConfirmModalOptions {
  variant?: Variant;
  header?: string | MessageDescriptor;
  message?: string | MessageDescriptor;
  messageValues?: Record<string, TranslationValue>;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string | MessageDescriptor;
  showBackdrop?: boolean;
  showCancel?: boolean;
  showConfirm?: boolean;
  children?: ReactNode;
  formattedText?: string;
  className?: string;
}

type State = {
  options: IConfirmModalOptions | null;
};

const initialState: State = {
  options: null,
};

export const confirmModalSlice = createSlice({
  name: "confirmModal",
  initialState,
  reducers: {
    openConfirmModal(state, action: PayloadAction<IConfirmModalOptions>) {
      const defaultOptions = {
        confirmText: { id: "confirmWindow.yes" },
        showBackdrop: true,
        showCancel: true,
        showConfirm: true,
        variant: Variant.Confirm,
      };

      state.options = {
        ...defaultOptions,
        ...action.payload,
      };
    },
    closeConfirmModal(state) {
      state.options = null;
    },
  },
});

export const { openConfirmModal, closeConfirmModal } =
  confirmModalSlice.actions;

export const isConfirmModalOpen = createSelector(
  [(state: { confirmModal: State }) => state.confirmModal],
  (modalState) => !!modalState.options
);
