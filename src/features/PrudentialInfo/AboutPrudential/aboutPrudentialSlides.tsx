import React from "react";
import CircleOfLife2 from "../../../assets/slides/kolo-zycia-1.jpg";
import CircleOfLife1 from "../../../assets/slides/kolo-zycia.jpg";
import MgWorld from "../../../assets/slides/mg-na-swiecie.jpg";
import AboutPrudential from "../../../assets/slides/o-prudential.jpg";
import PrudentialInTheWorld from "../../../assets/slides/prudential-na-swiece.jpg";
import PrudentialInPolandTable from "../../../assets/slides/prudential-w-polsce-table.jpg";
import PrudentialInPoland from "../../../assets/slides/prudential-w-polsce.jpg";
import CompanyValues from "../../../assets/slides/wartosci-firmy.jpg";
import WeSupportClients from "../../../assets/slides/wspieramy-klientow.jpg";
import SharedHistory from "../../../assets/slides/wspolna-historia.jpg";
import { ImageSlide } from "../commons/ImageSlide";
import { ISlideData } from "../commons/types";

export const aboutPrudentialSlides: ISlideData[] = [
  {
    id: "AboutPrudential",
    pageLabel: "about.title",
    component: () => <ImageSlide src={AboutPrudential} />,
  },
  {
    id: "PrudentialInTheWorld",
    pageLabel: "about.title",
    component: () => <ImageSlide src={PrudentialInTheWorld} />,
  },
  {
    id: "PrudentialInPoland",
    pageLabel: "about.title",
    component: () => <ImageSlide src={PrudentialInPoland} />,
  },
  {
    id: "WeSupportClients",
    pageLabel: "about.title",
    component: () => <ImageSlide src={WeSupportClients} />,
  },
  {
    id: "SharedHistory",
    pageLabel: "about.title",
    component: () => <ImageSlide src={SharedHistory} />,
  },
  {
    id: "MgWorld",
    pageLabel: "about.title",
    component: () => <ImageSlide src={MgWorld} />,
  },
  {
    id: "CompanyValues",
    pageLabel: "about.title",
    component: () => <ImageSlide src={CompanyValues} />,
  },
  {
    id: "CircleOfLife1",
    pageLabel: "about.title",
    component: () => <ImageSlide src={CircleOfLife1} />,
  },
  {
    id: "CircleOfLife2",
    pageLabel: "about.title",
    component: () => <ImageSlide src={CircleOfLife2} />,
  },
  {
    id: "PrudentialInPolandTable",
    pageLabel: "about.title",
    component: () => <ImageSlide src={PrudentialInPolandTable} />,
  },
];
