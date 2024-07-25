import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AdequacyStatus,
  AdequacyType,
  IddReportNameType,
  IddStatus,
  IProduct,
  IsAdequateType,
  ReportName,
  ReportNameType,
} from "features/Products/types";
import { signOutSuccess } from "./auth";
import {
  hideFullscreenSpinner,
  showFullscreenSpinner,
} from "./fullscreenSpinner";
import { api } from "utils/api";
import { RootState } from "AppStore";
import { redirect } from "utils/router";

export enum ProductsStatus {
  Init = "Init",
  Loading = "Loading",
  Loaded = "Loaded",
  Failure = "Failure",
}

export interface IProductJSON {
  meeting_id: number;
  meeting_no: string;
  login: string;
  meeting_status: string;
  meeting_product_id: number;
  product_guid: number;
  product_name: string;
  product_is_adequate: IsAdequateType;
  adequacy_id: number | null;
  raport_name: ReportNameType;
  adequacy_status: AdequacyType;
  nof_meetings_product_calcs: number;
  idd_raport_name: IddReportNameType;
  idd_status: IddStatus;
}

type State = {
  status: ProductsStatus;
  items: IProduct[];
  activeProductGuid?: number;
  eappProducts: number[];
};

const initialState: State = {
  status: ProductsStatus.Init,
  items: [],
  activeProductGuid: undefined,
  eappProducts: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProductsRequested: (state) => {
      state.status = ProductsStatus.Loading;
    },
    getProductsSuccess: (state, action: PayloadAction<IProduct[]>) => {
      state.status = ProductsStatus.Loaded;
      state.items = action.payload;
    },
    setProductsFailure: (state) => {
      state.status = ProductsStatus.Failure;
    },
    setActiveProduct: (state, action: PayloadAction<number>) => {
      state.activeProductGuid = action.payload;
    },
    clearActiveProduct: (state) => {
      state.activeProductGuid = undefined;
    },
    resetProducts: () => initialState,
    setEappProducts: (state, action: PayloadAction<number[]>) => {
      state.eappProducts = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(signOutSuccess, () => initialState);
  },
});

export const {
  getProductsRequested,
  getProductsSuccess,
  setProductsFailure,
  setActiveProduct,
  clearActiveProduct,
  resetProducts,
  setEappProducts,
} = productsSlice.actions;

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

const transformProducts = (data: IProductJSON[]) =>
  data.map((item) => ({
    product_guid: item.product_guid,
    product_name: item.product_name,
    product_is_adequate: parseStatus(item.product_is_adequate),
    raport_name: item.raport_name,
    adequacy_status: item.adequacy_status,
    meeting_product_id: item.meeting_product_id,
    idd_raport_name: item.idd_raport_name,
    idd_status: item.idd_status,
  }));

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, { dispatch }) => {
    dispatch(getProductsRequested());
    dispatch(showFullscreenSpinner());
    return api
      .get<IProductJSON[]>("api/meetings/products")
      .then((products) => {
        dispatch(getProductsSuccess(transformProducts(products)));
        dispatch(hideFullscreenSpinner());
      })
      .catch(() => {
        dispatch(setProductsFailure());
        dispatch(hideFullscreenSpinner());
      });
  }
);

export const goToAdequacy = createAsyncThunk(
  "products/goToAdequacy",
  async (_, { getState, dispatch }) => {
    dispatch(showFullscreenSpinner());
    const state = getState() as RootState;
    const { raport_name: reportName } =
      state.products.items.find(
        (product) =>
          product.raport_name === ReportName.BOP &&
          product.adequacy_status === AdequacyStatus.Finished
      ) || ({} as IProduct);

    if (reportName) {
      redirect("/report-bop", false, { reportName });
    } else {
      redirect("/bop");
    }
  }
);
