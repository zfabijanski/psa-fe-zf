import "styled-components";

import { Theme } from "./theme";

export type StyledFunction<T> = (args: T & { theme: Theme }) => any;

export type ColorType =
  | "backgroundMain"
  | "lightGray"
  | "gray"
  | "darkGray"
  | "red"
  | "darkRed"
  | "green"
  | "textPrimary"
  | "textSemitransparent"
  | "emerald"
  | "lightEmerald"
  | "white"
  | "transparent";

export type FontFamilyType = "primaryRegular";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
