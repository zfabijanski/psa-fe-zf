import { ReactNode } from "react";

// tslint:disable-next-line
export type KeyValuePair<T> = { [key: string]: T };

export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<RecursivePartial<U>>
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P];
};

export enum WhiteSpace {
  HtmlNonBreakingSpace = "&nbsp;",
  NonBreakingSpace = "\u00A0",
  ZeroWidthSpace = "\u200b",
}

export type TranslationValue = ReactNode | undefined;
