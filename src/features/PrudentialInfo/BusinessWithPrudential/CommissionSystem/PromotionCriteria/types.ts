export interface IRow {
  col1: string;
  col2: string | string[];
}

interface ISection {
  title?: string;
  rows: IRow[];
}

export interface IDetails {
  header: string;
  details: ISection[];
}

export interface IDetailsConfig {
  [key: string]: IDetails;
}

export type Role =
  | "consultant"
  | "managerIntern"
  | "manager"
  | "director"
  | "seniorDirector";
