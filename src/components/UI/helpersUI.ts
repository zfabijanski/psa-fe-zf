export interface IStatusFlags {
  isActive: boolean;
  isApproved: boolean;
}

export enum DataEntryMode {
  Gray = "GRAY",
  White = "WHITE",
}

export interface IDataEntry {
  mode?: DataEntryMode;
  error?: string;
  isHighlighted?: boolean;
  outOfDate?: boolean;
  disabled?: boolean;
}
