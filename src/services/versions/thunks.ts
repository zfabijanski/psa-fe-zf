import { ThunkResult } from "../../AppStore";
import { api } from "../../utils/api";
import { setFakeVersion } from "../../utils/version";

interface IVersion {
  version: string;
}

export const getApiVersion = (): ThunkResult => () => {
  return api
    .get<IVersion>("/api/version", undefined, true)
    .then((data) => {
      document.title += `, BE:${data.version}`;
    })
    .catch(() => {
      document.title += ", BE:?version?";
    });
};

export const fakeVersion =
  (version: string): ThunkResult =>
  () => {
    setFakeVersion(version);
  };
