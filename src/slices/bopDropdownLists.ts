import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SelectOption } from "components/UI/Select";
import { Status } from "slices/dictionaries";
import { api } from "utils/api";

enum DropdownSetType {
  ANSWER_NUM_0_5_LV = "ANSWER_NUM_0_5_LV",
  ANSWER_NUM_1_15_LV = "ANSWER_NUM_1_15_LV",
  ANSWER_RETIREMENT_LV = "ANSWER_RETIREMENT_LV",
  ANSWER_OLD_LV = "ANSWER_OLD_LV",
}

type DropdownSet = keyof typeof DropdownSetType;

export type IDropdownLists = { [key in DropdownSet]: SelectOption[] };

export interface IDropdownListJSON {
  answer_lv_code: DropdownSet;
  answer_code: string;
  answer_value: string;
  answer_next: string;
  order_no: number;
}

type State = {
  items: IDropdownLists;
  status: Status;
};

const initialState: State = {
  items: {
    ANSWER_NUM_0_5_LV: [],
    ANSWER_NUM_1_15_LV: [],
    ANSWER_OLD_LV: [],
    ANSWER_RETIREMENT_LV: [],
  },
  status: Status?.Default,
};

export const bopDropdownListsSlice = createSlice({
  name: "bopDropdownLists",
  initialState,
  reducers: {
    addBopDropdownListsSuccess(state, action: PayloadAction<IDropdownLists>) {
      state.items = action.payload;
      state.status = Status.Loaded;
    },
    requestBopDropdownLists(state) {
      state.status = Status.Fetching;
    },
    addBopDropdownListsFailure(state) {
      state.status = Status.Error;
    },
  },
});

export const {
  addBopDropdownListsFailure,
  addBopDropdownListsSuccess,
  requestBopDropdownLists,
} = bopDropdownListsSlice.actions;

const buildDropdownObject = (data: IDropdownListJSON[]) =>
  data.reduce<IDropdownLists>(
    (acc, current) => {
      acc[current.answer_lv_code].push({
        value: current.answer_code,
        text: current.answer_value,
        orderNumber: String(current.order_no),
      });
      return acc;
    },
    {
      ANSWER_NUM_0_5_LV: [],
      ANSWER_NUM_1_15_LV: [],
      ANSWER_RETIREMENT_LV: [],
      ANSWER_OLD_LV: [],
    }
  );

const sortDropdownLists = (dropdownLists: IDropdownLists) => {
  const compareElements = (a: SelectOption, b: SelectOption) => {
    if (a.orderNumber && b.orderNumber) {
      return +a.orderNumber - +b.orderNumber;
    }
    return 0;
  };
  dropdownLists.ANSWER_NUM_0_5_LV.sort(compareElements);
  dropdownLists.ANSWER_NUM_1_15_LV.sort(compareElements);
  dropdownLists.ANSWER_OLD_LV.sort(compareElements);
  dropdownLists.ANSWER_RETIREMENT_LV.sort(compareElements);
  return dropdownLists;
};

export const transformResponse = (data: IDropdownListJSON[]) =>
  sortDropdownLists(buildDropdownObject(data));

export const loadDropdownDictionaries = createAsyncThunk(
  "bopDropdownLists/loadDropdownDictionaries",
  async (_, { dispatch }) => {
    dispatch(requestBopDropdownLists());
    api
      .get<IDropdownListJSON[]>("/api/adequacy/list-values")
      .then((res) => transformResponse(res))
      .then((dropdownLists) =>
        dispatch(addBopDropdownListsSuccess(dropdownLists))
      )
      .catch((error) => {
        dispatch(addBopDropdownListsFailure());
        throw error;
      });
  }
);
