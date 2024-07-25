import { AnyAction } from "@reduxjs/toolkit";
import {
  areInputsNotEmpty,
  InputId,
  quarterlyIncomeCalculatorSlice,
  setChartData,
  setInputValue,
} from "./quarterlyIncomeCalculator";

const { reducer: quarterlyIncomeCalculator, getInitialState } =
  quarterlyIncomeCalculatorSlice;

describe("quarterlyIncomeCalculator slice", () => {
  it("should return the initial state", () => {
    expect(quarterlyIncomeCalculator(undefined, {} as AnyAction)).toEqual(
      getInitialState()
    );
  });

  it("should handle SetInputValue action", () => {
    expect(
      quarterlyIncomeCalculator(
        getInitialState(),
        setInputValue({
          id: InputId.APE,
          value: "test",
        })
      )
    ).toMatchInlineSnapshot(`
      Object {
        "chartData": Object {
          "month12": Object {
            "firstYearProvision": 0,
            "monthlyProvision": 0,
            "quarterlyBonus": 0,
            "reserve": 0,
          },
          "month18": Object {
            "firstYearProvision": 0,
            "monthlyProvision": 0,
            "quarterlyBonus": 0,
            "reserve": 0,
          },
          "month2": Object {
            "firstYearProvision": 0,
            "monthlyProvision": 0,
            "quarterlyBonus": 0,
            "reserve": 0,
          },
          "month3": Object {
            "firstYearProvision": 0,
            "monthlyProvision": 0,
            "quarterlyBonus": 0,
            "reserve": 0,
          },
          "month4": Object {
            "firstYearProvision": 0,
            "monthlyProvision": 0,
            "quarterlyBonus": 0,
            "reserve": 0,
          },
        },
        "inputData": Object {
          "ape": Object {
            "id": "ape",
            "label": "commissionSystem.quaterlyIncomeCalculator.inputs.ape.label",
            "maxValue": 999999,
            "suffix": "commissionSystem.quaterlyIncomeCalculator.inputs.ape.suffix",
            "value": "test",
          },
          "bonus": Object {
            "id": "bonus",
            "label": "commissionSystem.quaterlyIncomeCalculator.inputs.bonus.label",
            "maxValue": 999999,
            "suffix": "commissionSystem.quaterlyIncomeCalculator.inputs.bonus.suffix",
            "value": "",
          },
          "duration": Object {
            "id": "duration",
            "label": "commissionSystem.quaterlyIncomeCalculator.inputs.duration.label",
            "maxValue": 999999,
            "suffix": "commissionSystem.quaterlyIncomeCalculator.inputs.duration.suffix",
            "value": "",
          },
          "income": Object {
            "id": "income",
            "label": "commissionSystem.quaterlyIncomeCalculator.inputs.income.label",
            "maxValue": 0,
            "suffix": "commissionSystem.quaterlyIncomeCalculator.inputs.income.suffix",
            "value": "",
          },
          "month": Object {
            "id": "month",
            "label": "commissionSystem.quaterlyIncomeCalculator.inputs.month.label",
            "maxValue": 999999,
            "value": "",
          },
          "policy": Object {
            "id": "policy",
            "label": "commissionSystem.quaterlyIncomeCalculator.inputs.policy.label",
            "maxValue": 999999,
            "value": "",
          },
        },
      }
    `);
  });

  it("should handle SetChartData action", () => {
    expect(
      quarterlyIncomeCalculator(
        getInitialState(),
        setChartData({
          month2: {
            firstYearProvision: 100,
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
        })
      )
    ).toEqual({
      ...getInitialState(),
      chartData: {
        month2: {
          firstYearProvision: 100,
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
    });
  });
});

describe("areInputsNotEmpty", () => {
  it("should return true if all inputs are not empty", () => {
    expect(
      areInputsNotEmpty({
        chartData: {
          month2: {
            firstYearProvision: 1,
            monthlyProvision: 1,
            quarterlyBonus: 1,
            reserve: 1,
          },
          month3: {
            firstYearProvision: 1,
            monthlyProvision: 1,
            quarterlyBonus: 1,
            reserve: 1,
          },
          month4: {
            firstYearProvision: 1,
            monthlyProvision: 1,
            quarterlyBonus: 1,
            reserve: 1,
          },
          month12: {
            firstYearProvision: 1,
            monthlyProvision: 1,
            quarterlyBonus: 1,
            reserve: 1,
          },
          month18: {
            firstYearProvision: 1,
            monthlyProvision: 1,
            quarterlyBonus: 1,
            reserve: 1,
          },
        },
        inputData: {
          [InputId.APE]: {
            id: InputId.APE,
            label: "APE",
            value: "1",
            maxValue: 99,
          },
          [InputId.Duration]: {
            id: InputId.Duration,
            label: "Duration",
            value: "1",
            maxValue: 99,
          },
          [InputId.Month]: {
            id: InputId.Month,
            label: "Month",
            value: "1",
            maxValue: 99,
          },
          [InputId.Policy]: {
            id: InputId.Policy,
            label: "Policy",
            value: "1",
            maxValue: 99,
          },
        },
      })
    ).toEqual(true);
  });

  it("should return false if any input is empty", () => {
    expect(
      areInputsNotEmpty({
        chartData: {
          month2: {
            firstYearProvision: 0,
            monthlyProvision: 4,
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
            monthlyProvision: 1,
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
        inputData: {
          [InputId.APE]: {
            id: InputId.APE,
            label: "APE",
            value: "5",
            maxValue: 99,
          },
          [InputId.Duration]: {
            id: InputId.Duration,
            label: "Duration",
            value: "0",
            maxValue: 99,
          },
          [InputId.Month]: {
            id: InputId.Month,
            label: "Month",
            value: "0",
            maxValue: 99,
          },
          [InputId.Policy]: {
            id: InputId.Policy,
            label: "Policy",
            value: "0",
            maxValue: 99,
          },
        },
      })
    ).toEqual(false);
  });
});
