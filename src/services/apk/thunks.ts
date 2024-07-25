import { ThunkResult } from "../../AppStore";
import { showModal } from "slices/modal";

export const openModal = (): ThunkResult => (dispatch) => {
  dispatch(showModal({ modalContentTrKey: "apk.modal.content" }));
};
