import { IModalData } from "../models/Modal";
import { redirect } from "./router";

export const maxMeetingsCountExceededModal = {
  modalContentTrKey: "startNewMeeting.warning.exceeded",
  modalButtons: {
    cancel: { textTrKey: "confirmWindow.back" },
    confirm: {
      textTrKey: "modal.ok",
      onClick: () => redirect("/history"),
    },
  },
};

export const noInternetAccessModal = {
  modalContentTrKey: "app.error.noInternetConnection",
};

export const noInternetAccessLostDataModal = {
  modalTitleTrKey: "app.error.noInternetConnection",
  modalContentTrKey: "app.error.lostData",
};

export const newErrorModal = (
  modalContentTrKey: IModalData["modalContentTrKey"],
  modalTitleTrKey?: IModalData["modalTitleTrKey"],
  onClick?: () => void
) => ({
  modalContentTrKey,
  modalTitleTrKey,
  modalButtons: onClick
    ? { confirm: { textTrKey: "modal.ok", onClick } }
    : undefined,
});
