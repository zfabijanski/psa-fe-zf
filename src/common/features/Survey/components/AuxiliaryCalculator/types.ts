import { IRow as IExpensesRow } from "./ExpensesCalculator/types";
import { IHealthProblemData } from "./HealthProblemsCalculator/types";
import { IRow as INeedsRow } from "./NeedsCalculator/types";

export type CalculatorData =
  | INeedsRow[]
  | IExpensesRow[]
  | IHealthProblemData[];

export type Calculator = "needs" | "expenses" | "healthProblems";

export interface ICalculatorData {
  data: CalculatorData;
  type: Calculator;
}
