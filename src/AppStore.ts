import {
  configureStore,
  ThunkAction,
  ThunkDispatch,
  Action,
  ActionCreator,
  combineReducers,
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// slices
import { authSlice } from "slices/auth";
import { auxiliaryCalculatorSlice } from "slices/auxiliaryCalculator";
import { bopDropdownListsSlice } from "slices/bopDropdownLists";
import { bopSlice, actions as bopActions } from "slices/bop";
import { businessWithPrudentialSlice } from "slices/businessWithPrudential";
import { calculatorSlice } from "slices/calculator";
import { confirmModalSlice } from "slices/confirmModal";
import { coversConfigSlice } from "slices/coversConfig";
import { dictionariesSlice } from "slices/dictionaries";
import { fullscreenSpinnerSlice } from "slices/fullscreenSpinner";
import { fundRiskProfilesConfigSlice } from "slices/fundRiskProfilesConfig";
import { iddSlice, actions as iddActions } from "slices/idd";
import { librarySlice } from "slices/library";
import { mailSlice } from "slices/mail";
import { meetingsSlice } from "slices/meetings";
import { modalSlice } from "slices/modal";
import { productCoversLimitsSlice } from "slices/productCoversLimits";
import { productsConfigSlice } from "slices/productsConfig";
import { productsSlice } from "slices/products";
import { quarterlyIncomeCalculatorSlice } from "slices/quarterlyIncomeCalculator";
import { translationsSlice } from "slices/translations";
import { illustrationsSlice } from "slices/illustrations";

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  auxiliaryCalculator: auxiliaryCalculatorSlice.reducer,
  bop: bopSlice.reducer,
  bopDropdownLists: bopDropdownListsSlice.reducer,
  businessWithPrudential: businessWithPrudentialSlice.reducer,
  calculator: calculatorSlice.reducer,
  confirmModal: confirmModalSlice.reducer,
  coversConfig: coversConfigSlice.reducer,
  dictionaries: dictionariesSlice.reducer,
  fullscreenSpinner: fullscreenSpinnerSlice.reducer,
  fundRiskProfilesConfig: fundRiskProfilesConfigSlice.reducer,
  idd: iddSlice.reducer,
  illustrations: illustrationsSlice.reducer,
  library: librarySlice.reducer,
  mail: mailSlice.reducer,
  meetings: meetingsSlice.reducer,
  modal: modalSlice.reducer,
  productCoversLimits: productCoversLimitsSlice.reducer,
  products: productsSlice.reducer,
  productsConfig: productsConfigSlice.reducer,
  quarterlyIncomeCalculator: quarterlyIncomeCalculatorSlice.reducer,
  translations: translationsSlice.reducer,
});

const devToolsActionCreators = {
  auth: authSlice.actions,
  auxiliaryCalculator: auxiliaryCalculatorSlice.actions,
  bop: bopActions,
  bopDropdownLists: bopDropdownListsSlice.actions,
  businessWithPrudential: businessWithPrudentialSlice.actions,
  calculator: calculatorSlice.actions,
  confirmModal: confirmModalSlice.actions,
  coversConfig: coversConfigSlice.actions,
  dictionaries: dictionariesSlice.actions,
  fullscreenSpinner: fullscreenSpinnerSlice.actions,
  fundRiskProfilesConfig: fundRiskProfilesConfigSlice.actions,
  idd: iddActions,
  illustrations: illustrationsSlice.actions,
  library: librarySlice.actions,
  mail: mailSlice.actions,
  meetings: meetingsSlice.actions,
  modal: modalSlice.actions,
  productCoversLimits: productCoversLimitsSlice.actions,
  products: productsSlice.actions,
  productsConfig: productsConfigSlice.actions,
  quarterlyIncomeCalculator: quarterlyIncomeCalculatorSlice.actions,
  translations: translationsSlice.actions,
  // Workaround for the devTools middleware not being able to handle
  // action creators that return a function
} as unknown as Record<string, ActionCreator<unknown>>;

const store = configureStore({
  reducer: rootReducer,
  devTools: {
    name: `PSA Online, timestamp:${Date.now()}`,
    actionCreators: devToolsActionCreators,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = Readonly<ReturnType<typeof rootReducer>>;
export type ThunkResult<T = void> = ThunkAction<
  T,
  RootState,
  undefined,
  Action<any>
>;

export type TAppDispatch = ThunkDispatch<RootState, any, Action>;
export const useAppDispatch = () => useDispatch<TAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export { configureStore };

export default store;
