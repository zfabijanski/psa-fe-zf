import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
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

export const dictionariesApi = createApi({
  reducerPath: "dictionariesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/psao/api/statuses" }),
  endpoints: (builder) => ({
    getDictionaries: builder.query<KeyValuePair<Dictionary>, void>({
      query: () => "/",
      transformResponse: ({ response }: { response: IDictionaryItem[] }) =>
        transformDictionary(response),
    }),
  }),
});

export const dictionariesSlice = createSlice({
  name: "dictionaries",
  initialState,
  reducers: {
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
  extraReducers(builder) {
    builder.addMatcher(
      dictionariesApi.endpoints.getDictionaries.matchPending,
      (state) => {
        state.status = Status.Fetching;
      }
    );

    builder.addMatcher(
      dictionariesApi.endpoints.getDictionaries.matchFulfilled,
      (state, action) => {
        state.items = {
          ...state.items,
          ...action.payload,
        };
        state.status = Status.Loaded;
      }
    );
  },
});

export const transformDictionary = (dictionaryItems: IDictionaryItem[]) => {
  const dictionary = dictionaryItems.reduce<Dictionary>((acc, currValue) => {
    acc[currValue.id] = currValue;
    return acc;
  }, {});

  return {
    statuses: dictionary,
  };
};

export const { useGetDictionariesQuery, useLazyGetDictionariesQuery } =
  dictionariesApi;
