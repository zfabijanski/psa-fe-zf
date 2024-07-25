import {
  createSlice,
  createSelector,
  PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { SidePanelInputData } from "features/PrudentialInfo/BusinessWithPrudential/QuarterlyIncomeCalculator/types";
import { getIntFromString } from "utils/getIntFromString";

export enum InputId {
  Month = "month",
  Policy = "policy",
  APE = "ape",
  Duration = "duration",
  Bonus = "bonus",
  Income = "income",
}

export enum Bar {
  Month2 = "month2",
  Month3 = "month3",
  Month4 = "month4",
  Month12 = "month12",
  Month18 = "month18",
}

export interface IInputData {
  id: InputId;
  label: string;
  maxValue: number;
  suffix?: string;
}

export interface IInputDataRecord extends IInputData {
  value: string;
}

export interface IBarChartRecord {
  firstYearProvision: number;
  monthlyProvision: number;
  quarterlyBonus: number;
  reserve: number;
}

export type BarChart = Record<Bar, IBarChartRecord>;

type State = {
  inputData: SidePanelInputData;
  chartData: BarChart;
};

const initialState: State = {
  inputData: createInputData().reduce<SidePanelInputData>((acc, elt) => {
    acc[elt.id] = { ...elt, value: "" };
    return acc;
  }, {}),
  chartData: {
    month2: {
      firstYearProvision: 0,
      monthlyProvision: 0,
      quarterlyBonus: 0,
      reserve: 0,
    },
    month3: {
      firstYearProvision: 0,
      monthlyProvision: 0,
      quarterlyBonus: 0,
      reserve: 0,
    },
    month4: {
      firstYearProvision: 0,
      monthlyProvision: 0,
      quarterlyBonus: 0,
      reserve: 0,
    },
    month12: {
      firstYearProvision: 0,
      monthlyProvision: 0,
      quarterlyBonus: 0,
      reserve: 0,
    },
    month18: {
      firstYearProvision: 0,
      monthlyProvision: 0,
      quarterlyBonus: 0,
      reserve: 0,
    },
  },
};

export const quarterlyIncomeCalculatorSlice = createSlice({
  name: "quarterlyIncomeCalculator",
  initialState,
  reducers: {
    setInputValue(
      state,
      action: PayloadAction<{ id: InputId; value: string }>
    ) {
      const { id, value } = action.payload;
      state.inputData[id].value = value;
    },
    setChartData(state, action: PayloadAction<BarChart>) {
      state.chartData = action.payload;
    },
  },
});

export const { setInputValue, setChartData } =
  quarterlyIncomeCalculatorSlice.actions;

const getAPE = (state: State) => state.inputData[InputId.APE].value;
const getDuration = (state: State) => state.inputData[InputId.Duration].value;
const getMonth = (state: State) => state.inputData[InputId.Month].value;
const getPolicy = (state: State) => state.inputData[InputId.Policy].value;

export const areInputsNotEmpty = createSelector(
  [getAPE, getDuration, getMonth, getPolicy],
  (APE, duration, month, policy) =>
    getIntFromString(APE) !== 0 &&
    getIntFromString(duration) !== 0 &&
    getIntFromString(month) !== 0 &&
    getIntFromString(policy) !== 0
);

export const setChartDataValues = createAsyncThunk(
  "quarterlyIncomeCalculator/setChartDataValues",
  async (
    {
      firstYearCommisionWithoutReserve,
      bonus1,
      bonus2,
      bonus3,
      individualCommisionPercentage,
      halfReserve,
    }: {
      firstYearCommisionWithoutReserve: number;
      bonus1: number;
      bonus2: number;
      bonus3: number;
      individualCommisionPercentage: number;
      halfReserve: number;
    },
    { dispatch }
  ) => {
    dispatch(
      setChartData({
        month2: {
          firstYearProvision: firstYearCommisionWithoutReserve,
          monthlyProvision: bonus1,
          quarterlyBonus: individualCommisionPercentage,
          reserve: 0,
        },
        month3: {
          firstYearProvision: firstYearCommisionWithoutReserve,
          monthlyProvision: bonus2,
          quarterlyBonus: individualCommisionPercentage,
          reserve: 0,
        },
        month4: {
          firstYearProvision: firstYearCommisionWithoutReserve,
          monthlyProvision: bonus3,
          quarterlyBonus: individualCommisionPercentage,
          reserve: 0,
        },
        month12: {
          firstYearProvision: 0,
          quarterlyBonus: 0,
          monthlyProvision: 0,
          reserve: halfReserve,
        },
        month18: {
          firstYearProvision: 0,
          quarterlyBonus: 0,
          monthlyProvision: 0,
          reserve: halfReserve,
        },
      })
    );
  }
);

export const setPercentageBonusAndIncome = createAsyncThunk(
  "quarterlyIncomeCalculator/setPercentageBonusAndIncome",
  async (
    { percentageBonus, income }: { percentageBonus: number; income: number },
    { dispatch }
  ) => {
    const incomeString = income === 0 ? "" : Math.round(income).toString();
    const bonusString =
      incomeString === "" && percentageBonus === 0
        ? ""
        : percentageBonus.toString();
    dispatch(setInputValue({ id: InputId.Bonus, value: bonusString }));
    dispatch(setInputValue({ id: InputId.Income, value: incomeString }));
  }
);

export const resetChartValues = createAsyncThunk(
  "quarterlyIncomeCalculator/resetChartValues",
  async (_, { dispatch }) => {
    dispatch(setInputValue({ id: InputId.Bonus, value: "" }));
    dispatch(setInputValue({ id: InputId.Income, value: "" }));
    dispatch(setInputValue({ id: InputId.APE, value: "" }));
    dispatch(setInputValue({ id: InputId.Duration, value: "" }));
    dispatch(setInputValue({ id: InputId.Income, value: "" }));
    dispatch(setInputValue({ id: InputId.Month, value: "" }));
    dispatch(setInputValue({ id: InputId.Policy, value: "" }));
  }
);

function createInputData(): IInputData[] {
  return [
    {
      id: InputId.Month,
      label: "commissionSystem.quaterlyIncomeCalculator.inputs.month.label",
      maxValue: 999999,
    },
    {
      id: InputId.Policy,
      label: "commissionSystem.quaterlyIncomeCalculator.inputs.policy.label",
      maxValue: 999999,
    },
    {
      id: InputId.APE,
      label: "commissionSystem.quaterlyIncomeCalculator.inputs.ape.label",
      suffix: "commissionSystem.quaterlyIncomeCalculator.inputs.ape.suffix",
      maxValue: 999999,
    },
    {
      id: InputId.Duration,
      label: "commissionSystem.quaterlyIncomeCalculator.inputs.duration.label",
      suffix:
        "commissionSystem.quaterlyIncomeCalculator.inputs.duration.suffix",
      maxValue: 999999,
    },
    {
      id: InputId.Bonus,
      label: "commissionSystem.quaterlyIncomeCalculator.inputs.bonus.label",
      suffix: "commissionSystem.quaterlyIncomeCalculator.inputs.bonus.suffix",
      maxValue: 999999,
    },
    {
      id: InputId.Income,
      label: "commissionSystem.quaterlyIncomeCalculator.inputs.income.label",
      suffix: "commissionSystem.quaterlyIncomeCalculator.inputs.income.suffix",
      maxValue: 0,
    },
  ];
}
