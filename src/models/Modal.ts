import { ReactNode } from "react";
import { TIconType } from "../components/UI/Icon";
import { TranslationValue } from "utils/types";

export enum ButtonTypes {
  cancel = "cancel",
  confirm = "confirm",
}

export enum ModalTypes {
  default = "default",
  danger = "danger",
}

export interface IModalData {
  modalIllustration?: TIconType;
  modalTitleTrKey?: string;
  modalContentTrKey?:
    | string
    | (
        | string
        | string[]
        | { trKey: string; values?: Record<string, ReactNode> }
      )[];
  ModalComponent?: React.FC;
  modalContent?: ReactNode;
  modalHtml?: string;
  modalHtmlTrValues?: Record<string, TranslationValue>;
  modalButtons?: {
    [key in ButtonTypes]?: {
      textTrKey: string;
      onClick?: () => void;
    };
  };
  modalType?: ModalTypes;
  maskClosable?: boolean;
}
