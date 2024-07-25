import { createAsyncThunk } from "@reduxjs/toolkit";
import { mapAgentPositionToPositionName } from "../mapper/agent/agent";
import { api } from "../utils/api";
import { newErrorModal } from "../utils/confirmModalFactory";
import { redirect } from "../utils/router";
import {
  hideFullscreenSpinner,
  showFullscreenSpinner,
} from "slices/fullscreenSpinner";
import { init } from "../services/init";
import { showModal } from "slices/modal";
import {
  getAgentSuccess,
  signInFailure,
  signOutSuccess,
  IAuthInfo,
} from "./auth";
import { RootState } from "AppStore";

const loginUrl = "/home";

const isTrainEnv = window.location.host.includes("train.");

export const redirectToAgentPortalLandingPage = () => {
  window.location.pathname = "/home";
};

export const invalidateOtherSessions = createAsyncThunk(
  "auth/invalidateOtherSessions",
  async (_, { dispatch }) => {
    dispatch(showFullscreenSpinner());
    const config = { headers: { PSAOAuthRenew: true } };
    api
      .post("/api/auth/invalidateothersessions", {}, config)
      .then(() => {
        // @ts-expect-error
        return dispatch(init());
      })
      .then(() => redirect("/", true))
      .finally(() => {
        dispatch(hideFullscreenSpinner());
      });
  }
);

export const signOut = createAsyncThunk(
  "auth/signOut",
  async (_, { dispatch }) => {
    dispatch(
      showModal({
        modalIllustration: "padlock",
        modalTitleTrKey: "login.session.end",
        modalContentTrKey: "login.confirm.sureToLogout",
        modalButtons: {
          cancel: { textTrKey: "login.label.cancel" },
          confirm: {
            textTrKey: "login.label.logout",
            onClick: () => {
              dispatch(showFullscreenSpinner());
              api
                .delete("/api/session")
                .then(() => (window.location.href = loginUrl))
                .finally(() => {
                  dispatch(hideFullscreenSpinner());
                });
            },
          },
        },
      })
    );
  }
);

export const prolongUserSession = createAsyncThunk(
  "auth/prolongUserSession",
  () => api.get("api/auth/prolong")
);

export const getAgent = createAsyncThunk(
  "auth/getAgent",
  async (_, { dispatch }) => {
    return api
      .get<IAuthInfo>("/api/auth/agent")
      .then((agent) => ({
        ...agent,
        position: mapAgentPositionToPositionName(agent.brand, agent.position),
      }))
      .then((data) => {
        dispatch(getAgentSuccess(data));
      });
  }
);

export const redirectAndInformIfSessionExpired = createAsyncThunk(
  "auth/redirectAndInformIfSessionExpired",
  async (_, { dispatch, getState }) => {
    const state = getState() as RootState;
    redirect("/landing", true);
    if (state.auth.info) {
      dispatch(signOutSuccess());
      dispatch(
        showModal(
          newErrorModal("login.error.timeout", undefined, () => {
            window.location.href = loginUrl;
          })
        )
      );
    } else {
      window.location.href = loginUrl;
    }
  }
);

export const redirectAndInformAboutMultisession = createAsyncThunk(
  "auth/redirectAndInformAboutMultisession",
  async (_, { dispatch }) => {
    redirect("/landing", true);
    dispatch(
      showModal({
        modalContentTrKey: "login.confirm.sessionOtherDevice",
        modalButtons: {
          confirm: {
            textTrKey: "confirmWindow.yes",
            onClick: () => dispatch(invalidateOtherSessions()),
          },
          cancel: {
            textTrKey: "confirmWindow.back",
            onClick: () => redirectToAgentPortalLandingPage(),
          },
        },
      })
    );
  }
);

export const redirectAndInformAboutLoginErrors = createAsyncThunk(
  "auth/redirectAndInformAboutLoginErrors",
  async (_, { dispatch }) => {
    redirect("/landing", true);
    dispatch(signInFailure());
  }
);

export const redirectToAp = createAsyncThunk(
  "auth/redirectToAp",
  async (_, { dispatch, getState }) => {
    const { illustrations, calculator } = getState() as RootState;
    const calculationId = illustrations.previewedCalculationId;

    // Redirect to hydra without context
    let onConfirm = () => {
      window.open(`/home/api/log/hydra`, "_blank");
    };

    if (calculationId) {
      const previewedItem = illustrations.items.find(
        ({ pru_calc_calculation_id }) =>
          pru_calc_calculation_id === calculationId
      );
      const productGuid = previewedItem
        ? previewedItem.product_guid
        : calculator.current.productGuid;

      const payload = {
        productGuid,
        calculationId,
        isIllustrated: true,
      };

      // Redirect to new process in hydra
      onConfirm = () => {
        dispatch(showFullscreenSpinner());
        api
          .post<{ processInstanceId: number }>("api/calc/eapp", payload)
          .then(({ processInstanceId }) => {
            if (processInstanceId) {
              window.open(`/hydra/process/${processInstanceId}`, "_blank");
            } else {
              throw processInstanceId;
            }
          })
          .catch(() => {
            // tslint:disable-next-line: no-console
            console.warn("unable to create new process");
            dispatch(showModal(newErrorModal("auth.redirectToAp.error")));
          })
          .finally(() => {
            dispatch(hideFullscreenSpinner());
          });
      };
    }

    dispatch(
      showModal({
        modalTitleTrKey: "auth.redirectToAp.header",
        modalContentTrKey: isTrainEnv
          ? "auth.redirectToAp.trainMessage"
          : "auth.redirectToAp.message",
        modalButtons: {
          confirm: {
            textTrKey: "modal.ok",
            onClick: onConfirm,
          },
        },
      })
    );
  }
);
