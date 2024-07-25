import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "utils/api";
import { KeyValuePair } from "utils/types";

export interface IDictionaryItem {
  id: number;
  code: string;
  description: string;
}

export type Dictionary = KeyValuePair<IDictionaryItem>;

export enum Status {
  Default = "Default",
  Fetching = "Fetching",
  Loaded = "Loaded",
  Error = "Error",
}

type State = {
  items: KeyValuePair<Dictionary>;
  status: Status;
};

const initialState: State = {
  items: {},
  status: Status.Default,
};

export const dictionariesSlice = createSlice({
  name: "dictionaries",
  initialState,
  reducers: {
    requestDictionaries: (state) => {
      state.status = Status.Fetching;
    },
    addDictionariesSuccess: (
      state,
      action: PayloadAction<KeyValuePair<Dictionary>>
    ) => {
      state.items = {
        ...state.items,
        ...action.payload,
      };
      state.status = Status.Loaded;
    },
    addDictionariesFailure: (state) => {
      state.status = Status.Error;
    },
  },
});

export const {
  requestDictionaries,
  addDictionariesSuccess,
  addDictionariesFailure,
} = dictionariesSlice.actions;

export const transformDictionary = (dictionaryItems: IDictionaryItem[]) => {
  return dictionaryItems.reduce<Dictionary>((acc, currValue) => {
    acc[currValue.id] = currValue;
    return acc;
  }, {});
};

export const loadDictionaries = createAsyncThunk(
  "dictionaries/loadDictionaries",
  async (_, { dispatch }) => {
    const dictionariesInfo = [
      {
        name: "statuses",
        path: "api/statuses",
      },
    ];
    const fetchDictionary = (_: string, path: string) =>
      api
        .get<IDictionaryItem[]>(path, undefined, true)
        .then(transformDictionary);

    dispatch(requestDictionaries());

    return Promise.all(
      dictionariesInfo.map(({ name, path }) => fetchDictionary(name, path))
    )
      .then((results) => {
        const dictionaries = results.reduce<KeyValuePair<Dictionary>>(
          (acc, dictionary, index) => ({
            ...acc,
            [dictionariesInfo[index].name]: dictionary,
          }),
          {}
        );
        dispatch(addDictionariesSuccess(dictionaries));
      })
      .catch((error) => {
        dispatch(addDictionariesFailure());
        throw error;
      });
  }
);
