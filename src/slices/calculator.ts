import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { get } from "lodash";
import { ICalculationVM } from "features/Calculator/types";
import {
  filterDictionaryByValue,
  getCalculationId,
  getCalculationStatus,
  mapDictionaryValues,
} from "features/Calculator/utils";
import { CalculationIdType } from "features/Products/types";
import { CalculationState, CalculationStatus } from "models/calculator";
import { RootState } from "AppStore";

const initialCalculationState: CalculationState = {
  status: CalculationStatus.NotCalculated,
  calculationFeatureChanged: false,
};

export type Calculation = CalculationIdType | ICalculationVM;

type State = {
  current: {
    productGuid: number;
    index: number;
  };
  calculations: {
    [key: string]: Array<Calculation>;
  };
  calculationsState: {
    [calculationId: number]: CalculationState;
  };
};

const initialState: State = {
  current: {
    productGuid: 0,
    index: 0,
  },
  calculations: {},
  calculationsState: {},
};

export const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    setCurrentCalculation: (
      state,
      action: PayloadAction<{ productGuid: number; index: number }>
    ) => {
      state.current.index = action.payload.index;
      state.current.productGuid = action.payload.productGuid;
    },
    setCalculation(
      state,
      action: PayloadAction<{
        productGuid: number;
        index: number;
        calculation: Calculation;
      }>
    ) {
      const { calculation, productGuid, index } = action.payload;

      let calculations = state.calculations[productGuid]
        ? [...state.calculations[productGuid]]
        : [];
      calculations[index] = calculation;
      calculations = calculations.filter(Boolean);

      state.calculations[productGuid] = calculations;
    },
    setCalculationsIds(
      state,
      action: PayloadAction<{
        productGuid: number;
        calculations: CalculationIdType[];
      }>
    ) {
      const { calculations, productGuid } = action.payload;
      state.calculations[productGuid] = calculations;
      state.calculationsState = calculations.reduce(
        (newState, calculationId) => {
          if (calculationId) {
            newState[calculationId] = {
              status: CalculationStatus.Illustrated,
              calculationFeatureChanged: false,
            };
          }
          return newState;
        },
        state.calculationsState
      );
    },
    setCalculationFeatureChanged(
      state,
      action: PayloadAction<{
        calculationId: number;
        changed?: boolean;
      }>
    ) {
      const { calculationId, changed } = action.payload;
      state.calculationsState[calculationId].calculationFeatureChanged =
        changed ?? false;
    },
    setCalculationStatus(
      state,
      action: PayloadAction<{
        calculationId: number;
        status: CalculationStatus;
      }>
    ) {
      const { calculationId, status } = action.payload;
      state.calculationsState[calculationId] = {
        ...(status === CalculationStatus.Invalid
          ? state.calculationsState[calculationId]
          : initialCalculationState),
        status,
      };
    },
    clearUnillustratedCalculations(state) {
      const getIllustratedCalculations = (
        calculations: Array<CalculationIdType | ICalculationVM>
      ) =>
        calculations.filter(
          (calculation: CalculationIdType | ICalculationVM) =>
            getCalculationStatus(state.calculationsState, calculation) ===
            CalculationStatus.Illustrated
        );
      const getIllustratedStates = (calculationState: CalculationState) =>
        calculationState.status === CalculationStatus.Illustrated;

      state.calculations = mapDictionaryValues(
        state.calculations,
        getIllustratedCalculations
      );
      state.calculationsState = filterDictionaryByValue(
        state.calculationsState,
        getIllustratedStates
      ) as State["calculationsState"];
    },
    resetCalculatorState() {
      return initialState;
    },
  },
});

export const {
  setCurrentCalculation,
  setCalculation,
  setCalculationsIds,
  setCalculationFeatureChanged,
  setCalculationStatus,
  clearUnillustratedCalculations,
  resetCalculatorState,
} = calculatorSlice.actions;

export * from "./calculator.thunks";

const getCurrentProductGuid = (state: State) => state.current.productGuid;
const getCurrentIndex = (state: State) => state.current.index;
const getCalculations = (state: State) => state.calculations;
const getCalculationsState = (state: State) => state.calculationsState;

export const getCurrentCalculationId = createSelector(
  [getCurrentProductGuid, getCurrentIndex, getCalculations],
  (productGuid, index, calculations) =>
    getCalculationId((calculations[productGuid] || [])[index])
);

export const getCurrentCalculationState = createSelector(
  [getCurrentCalculationId, getCalculationsState],
  (calculationId, calculationsState): CalculationState =>
    (calculationId !== undefined && calculationsState[calculationId]) ||
    initialCalculationState
);

export const getCalculationSelector = (
  state: RootState,
  productGuid: number,
  index: number = 0
): CalculationIdType | ICalculationVM => {
  return get(state, ["calculator", "calculations", productGuid, index], null);
};
