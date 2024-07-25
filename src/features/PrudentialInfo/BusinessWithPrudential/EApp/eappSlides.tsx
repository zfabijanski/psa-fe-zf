import React from "react";
import { ISlideData } from "../../commons/types";
import EApp from "./EApp";

export const eappSlides: ISlideData[] = [
  {
    id: "EApp",
    pageLabel: "eapp.title",
    component: () => <EApp title={"eapp.slide.title"} />,
  },
];
