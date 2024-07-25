import { IInputDataRecord } from "slices/quarterlyIncomeCalculator";

export enum LegendColor {
  DarkGray = "#555555",
  LightGray = "#b9b9b9",
  LightEmerald = "rgb(23,176,173)",
  Black = "#222222",
}

export interface ILegendData {
  text: string;
  color: LegendColor;
}

export interface IBarValues {
  value: number;
  heightPercentage: number;
}

export type SidePanelInputData = Record<string, IInputDataRecord>;
