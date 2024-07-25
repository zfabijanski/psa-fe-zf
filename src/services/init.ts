import { ThunkResult } from "../AppStore";
import { reloadIfOutdatedVersion } from "../utils/version";
import { getAgent } from "slices/auth";
import { loadDropdownDictionaries } from "slices/bopDropdownLists";
import { loadDictionaries } from "slices/dictionaries";

export const init = (): ThunkResult => (dispatch) => {
  reloadIfOutdatedVersion();

  return Promise.all([
    dispatch(loadDictionaries()),
    dispatch(getAgent()),
    dispatch(loadDropdownDictionaries()),
  ]);
};
