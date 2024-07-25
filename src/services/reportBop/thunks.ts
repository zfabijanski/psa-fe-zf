import { ModalTypes } from "../../models/Modal";
import { ThunkResult } from "../../AppStore";
import { redirect } from "../../utils/router";
import { showModal } from "slices/modal";

export const goToProducts = (): ThunkResult => () => {
  redirect("/meeting");
};

export const repeatQuestionnaire = (): ThunkResult => (dispatch) => {
  dispatch(
    showModal({
      modalIllustration: "alert-double-triangle",
      modalTitleTrKey: "bop.confirm.denyTitle",
      modalType: ModalTypes.danger,
      modalContentTrKey: "bopAndIdd.warning.redoAdequacy",
      modalButtons: {
        cancel: { textTrKey: "confirmWindow.back" },
        confirm: {
          // TODO: apply deny styling?
          textTrKey: "confirmWindow.confirm",
          onClick: () => {
            redirect("/bop");
          },
        },
      },
    })
  );
};
