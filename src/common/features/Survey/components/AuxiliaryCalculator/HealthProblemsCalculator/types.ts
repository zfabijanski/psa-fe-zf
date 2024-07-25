export interface IHealthProblemData {
  image: string;
  title: string;
  amount: number;
  amountText: string;
  details: string[];
}

export interface IHealthProblem {
  data: IHealthProblemData[];
  onSave: (sum: number) => void;
  onCancel: () => void;
}
