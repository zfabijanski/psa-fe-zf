import { ReactNode } from "react";

export type SortOrder = "descend" | "ascend";
export interface IColumn<T> {
  field: keyof T;
  title: string;
  width?: string;
  render?: (record: T) => ReactNode;
  sorter?: (a: T, b: T) => number;
}

export interface IColumnSorting<T> {
  field: keyof T;
  order: SortOrder;
}
