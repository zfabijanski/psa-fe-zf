import { ThunkResult } from "../../AppStore";
import { redirect } from "../../utils/router";
import { resetQuestionnaire } from "slices/idd";

import { showFullscreenSpinner } from "slices/fullscreenSpinner";

export const onQuestionnaireStart = (): ThunkResult => (dispatch) => {
  dispatch(resetQuestionnaire());
  redirect("/idd");
  dispatch(showFullscreenSpinner());
};
