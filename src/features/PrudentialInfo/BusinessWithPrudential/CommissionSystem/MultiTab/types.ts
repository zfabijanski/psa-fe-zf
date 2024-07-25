export type TabName = "tab1" | "tab2";

export interface ITabs {
  id: TabName;
  text: string;
}

export interface ITableContent {
  tab1: string[][];
  tab2: string[][];
}
