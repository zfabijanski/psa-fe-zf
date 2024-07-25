import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { plMessages } from "translations/pl";
import { KeyValuePair } from "utils/types";

const DEBUGGING_ENABLED = false;

export enum Status {
  Default = "Default",
  Fetching = "Fetching",
  Loaded = "Loaded",
  Error = "Error",
}

export enum Locale {
  PL = "pl",
}

export type TranslationMessages = KeyValuePair<string>;

type State = {
  currentLocale: Locale;
  translations: KeyValuePair<TranslationMessages>;
  status: Status;
};

const initialState: State = {
  currentLocale: Locale.PL,
  translations: {},
  status: Status.Default,
};

export const translationsSlice = createSlice({
  name: "translations",
  initialState,
  reducers: {
    addLocaleSuccess: (
      state,
      action: PayloadAction<{ locale: Locale; messages: TranslationMessages }>
    ) => {
      state.translations[action.payload.locale] = action.payload.messages;
      state.status = Status.Loaded;
    },
  },
});

const { addLocaleSuccess } = translationsSlice.actions;

const messages = {
  [Locale.PL]: plMessages,
};

export const transformTranslations = (translations: TranslationMessages) => {
  if (DEBUGGING_ENABLED) {
    Object.keys(translations).forEach(
      (key) => (translations[key] = `PL_${translations[key]}`)
    );
  }
  return translations;
};

export const getTranslations = createAsyncThunk(
  "translations/getTranslations",
  async (locale: Locale = Locale.PL, { dispatch }) => {
    dispatch(
      addLocaleSuccess({
        locale,
        messages: transformTranslations(messages[locale]),
      })
    );
  }
);
