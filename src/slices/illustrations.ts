import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IAPK,
  IIllustration,
  IsAdequateType,
  OrderIdType,
} from "features/Products/types";
import { CalculationStatus } from "models/calculator";
import { signOutSuccess } from "./auth";
import { toValueOrDefault } from "mapper/calculator/dtoToVm";
import { sortByKey } from "utils/sortByKey";
import {
  hideFullscreenSpinner,
  showFullscreenSpinner,
} from "./fullscreenSpinner";
import {
  clearUnillustratedCalculationsRequest,
  setCurrentMeetingOutdated,
} from "./meetings";
import { clearUnillustratedCalculations } from "./calculator";
import { api, ApiError } from "utils/api";
import { showModal } from "./modal";
import { newErrorModal } from "utils/confirmModalFactory";

export interface IIllustrationJSON {
  product_guid: number;
  adequacy_id?: number;
  idd_id?: number;
  pru_calc_calculation_id: number | null;
  order_id: OrderIdType;
  calculation_is_adequate: IsAdequateType;
  calculation_expected_amount: number | null;
  calculation_premium_total: number | null;
  calculation_duration: number | null;
  calculation_duration_is_adq: IsAdequateType;
  calculation_premium_main_cover: number | null;
  calculation_premium_main_cover_is_adq: IsAdequateType;
  calculation_frequency_is_adq: IsAdequateType;
  calculation_frequency: number | null;
  calculation_json_status: CalculationStatus;
  calculation_sum_assured: number | null;
  calculation_sum_assured_is_adq: IsAdequateType;
  calculation_sum_of_premiums: number | null;
  calculation_sum_of_premiums_is_adq: IsAdequateType;
  investment_profile_name: string | null;
  investment_profile_is_adequacy: IsAdequateType;
  json_needs_analysis: string;
}

export enum IllustrationsStatus {
  Init = "Init",
  Loading = "Loading",
  Loaded = "Loaded",
  Failure = "Failure",
}

type State = {
  previewedCalculationId?: number;
  editedCalculationId?: number;
  items: IIllustration[];
  status: IllustrationsStatus;
};

const initialState: State = {
  items: [],
  status: IllustrationsStatus.Init,
};

export const illustrationsSlice = createSlice({
  name: "illustrations",
  initialState,
  reducers: {
    getIllustrationsRequested: (state) => {
      state.status = IllustrationsStatus.Loading;
    },
    getIllustrationsSuccess: (
      state,
      action: PayloadAction<IIllustration[]>
    ) => {
      state.status = IllustrationsStatus.Loaded;
      state.items = action.payload;
    },
    getIllustrationsFailure: (state) => {
      state.status = IllustrationsStatus.Failure;
    },
    openIllustrationPreview: (state, action: PayloadAction<number>) => {
      state.previewedCalculationId = action.payload;
    },
    closeIllustrationPreview: (state) => {
      state.previewedCalculationId = undefined;
    },
    removeIllustrationSuccess: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.pru_calc_calculation_id !== action.payload
      );
    },
    resetIllustrations: (state) => {
      state.items = [];
      state.status = IllustrationsStatus.Init;
    },
    previewIllustration: (state, action: PayloadAction<number>) => {
      state.previewedCalculationId = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(signOutSuccess, () => initialState);
  },
});

export const {
  getIllustrationsRequested,
  getIllustrationsSuccess,
  getIllustrationsFailure,
  openIllustrationPreview,
  closeIllustrationPreview,
  removeIllustrationSuccess,
  resetIllustrations,
  previewIllustration,
} = illustrationsSlice.actions;

const parseStatus = (value: IsAdequateType) => {
  switch (value) {
    case 0:
      return false;
    case 1:
      return true;
    default:
      return null;
  }
};

export const transformIllustrations = (data: IIllustrationJSON[]) =>
  data.map((item) => ({
    calculation_is_adequate: parseStatus(item.calculation_is_adequate),
    product_guid: item.product_guid,
    adequacy_id: item.adequacy_id,
    idd_id: item.idd_id,
    order_id: item.order_id,
    pru_calc_calculation_id: item.pru_calc_calculation_id,
    expected_amount: {
      value: item.calculation_expected_amount,
    },
    premium_total: {
      value: item.calculation_premium_total,
    },
    duration: {
      value: item.calculation_duration,
      calculation_is_adequate: parseStatus(item.calculation_duration_is_adq),
    },
    premium_main_cover: {
      value: item.calculation_premium_main_cover,
      calculation_is_adequate: parseStatus(
        item.calculation_premium_main_cover_is_adq
      ),
    },
    frequency: {
      value: item.calculation_frequency,
      calculation_is_adequate: parseStatus(item.calculation_frequency_is_adq),
    },
    sum_assured: {
      value: item.calculation_sum_assured,
      calculation_is_adequate: parseStatus(item.calculation_sum_assured_is_adq),
    },
    sum_of_premiums: {
      value: item.calculation_sum_of_premiums,
      calculation_is_adequate: parseStatus(
        item.calculation_sum_of_premiums_is_adq
      ),
    },
    investment_profile: {
      value: item.investment_profile_name,
      calculation_is_adequate: parseStatus(item.investment_profile_is_adequacy),
    },
    status: toValueOrDefault(item.calculation_json_status),
    json_needs_analysis:
      item.json_needs_analysis && JSON.parse(item.json_needs_analysis),
  }));

export const sortIllustrations = (data: IIllustration[]) =>
  sortByKey(data, "order_id");

export const getIllustrations = createAsyncThunk(
  "illustrations/getIllustrations",
  async (_, { dispatch }) => {
    dispatch(getIllustrationsRequested());
    dispatch(showFullscreenSpinner());
    return dispatch(clearUnillustratedCalculationsRequest())
      .then(() => {
        dispatch(clearUnillustratedCalculations());
        return api
          .get<IIllustrationJSON[]>(`api/meetings`)
          .then((illustrations) => {
            dispatch(
              getIllustrationsSuccess(
                sortIllustrations(transformIllustrations(illustrations))
              )
            );
          })
          .catch((err) => {
            if (err instanceof ApiError) {
              dispatch(getIllustrationsFailure());
            }
            throw err;
          });
      })
      .catch((error) => {
        if (error instanceof ApiError) {
          dispatch(showModal(newErrorModal(error.message)));
        }
        throw error;
      })
      .finally(() => {
        dispatch(hideFullscreenSpinner());
      });
  }
);

// (calculationId: number, callback?: () => void): ThunkResult =>
export const removeIllustration = createAsyncThunk(
  "illustrations/removeIllustration",
  async (
    { calculationId, callback }: { calculationId: number; callback?(): void },
    { dispatch }
  ) => {
    dispatch(
      showModal({
        modalContentTrKey: "illustrations.confirm.deleteIllustration",
        modalButtons: {
          confirm: {
            // TODO: apply deny styling?
            textTrKey: "confirmWindow.delete",
            onClick: () => {
              dispatch(showFullscreenSpinner());
              api
                .delete("api/meetings/calculation", {
                  data: { p_pru_calc_calculation_id: calculationId },
                })
                .catch((error) => {
                  if (error instanceof ApiError) {
                    dispatch(showModal(newErrorModal(error.message)));
                  }
                })
                .then(() => dispatch(removeIllustrationSuccess(calculationId)))
                .then(() => callback && callback())
                .finally(() => dispatch(hideFullscreenSpinner()));
            },
          },
        },
      })
    );
  }
);

export const saveAPK = createAsyncThunk(
  "illustrations/saveAPK",
  async (apk: IAPK, { dispatch }) => {
    dispatch(showFullscreenSpinner());
    api
      .post(`api/needs/add`, apk)
      .then(() => dispatch(setCurrentMeetingOutdated()))
      .catch((error) => {
        if (error instanceof ApiError) {
          dispatch(showModal(newErrorModal(error.message)));
        }
      })
      .finally(() => dispatch(hideFullscreenSpinner()));
  }
);
