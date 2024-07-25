import { ReactNode } from "react";

export interface ISlideRenderProps {
  handleNextSlideButtonClick: () => void;
}

export interface ISlideData {
  id: string;
  pageLabel: string;
  component: (props: ISlideRenderProps) => ReactNode;
}

export interface ITextColumnContent {
  label: string;
  description?: string;
}

export interface IBonusRow {
  header: string;
  content?: string;
}
