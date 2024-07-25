import React from "react";
import { ISlideData } from "../../commons/types";
import AdditionalContracts from "./AdditionalContracts/AdditionalContracts";
import InvestmentProducts from "./InvestmentProducts/InvestmentProducts";
import LifeComfort from "./LifeComfort/LifeComfort";
import ProtectiveAndSavingsProducts from "./ProtectiveAndSavingsProducts/ProtectiveAndSavingsProducts";
import ProtectiveProducts from "./ProtectiveProducts/ProtectiveProducts";
import SavingsInsurance from "./SavingsInsurance/SavingsInsurance";

export const prudentialProductsSlides: ISlideData[] = [
  {
    id: "ProtectiveAndSavingsProducts",
    pageLabel: "prudentialProducts.title",
    component: () => (
      <ProtectiveAndSavingsProducts
        title={"prudentialProducts.mainContract.title"}
      />
    ),
  },
  {
    id: "InvestmentProducts",
    pageLabel: "prudentialProducts.title",
    component: () => (
      <InvestmentProducts title={"prudentialProducts.mainContract.title"} />
    ),
  },
  {
    id: "ProtectiveProducts",
    pageLabel: "prudentialProducts.title",
    component: () => (
      <ProtectiveProducts title={"prudentialProducts.mainContract.title"} />
    ),
  },
  {
    id: "WhySavingsInsurance",
    pageLabel: "prudentialProducts.title",
    component: () => (
      <SavingsInsurance title={"prudentialProducts.savingsInsurance.title"} />
    ),
  },
  {
    id: "ProtectiveProductLifeComfort",
    pageLabel: "prudentialProducts.title",
    component: () => (
      <LifeComfort title={"prudentialProducts.protectiveProducts.title"} />
    ),
  },
  {
    id: "AdditionalContracts",
    pageLabel: "prudentialProducts.title",
    component: () => (
      <AdditionalContracts
        title={"prudentialProducts.additionalContracts.title"}
      />
    ),
  },
];
