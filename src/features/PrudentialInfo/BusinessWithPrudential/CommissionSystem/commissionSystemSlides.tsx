import React from "react";
import { ISlideData } from "../../commons/types";
import QuarterlyIncomeCalculator from "../QuarterlyIncomeCalculator";
import AdvantagesSlide from "./AdvantagesSlide";
import BasicCommission from "./BasicCommission";
import BonusSystem from "./BonusSystem";
import Contest from "./Contest";
import ExpectedIncome from "./ExpectedIncome";
import MaintenanceCriteria from "./MaintenanceCriteria";
import MultiTab from "./MultiTab";
import Override from "./Override";
import PromotionCriteria from "./PromotionCriteria";
import QuarterlyBonus from "./QuarterlyBonus";
import ReturnPolicy from "./ReturnPolicy";

export const commissionSystemSlides: ISlideData[] = [
  {
    id: "CommissionSystem",
    pageLabel: "commissionSystem.title",
    component: () => (
      <AdvantagesSlide title={"commissionSystem.commissionSystem.title"} />
    ),
  },
  {
    id: "BasicProvision",
    pageLabel: "commissionSystem.title",
    component: () => (
      <BasicCommission title={"commissionSystem.basicCommission.title"} />
    ),
  },
  {
    id: "ReturnPolicy",
    pageLabel: "commissionSystem.title",
    component: () => (
      <ReturnPolicy title={"commissionSystem.returnPolicy.title"} />
    ),
  },
  {
    id: "ExpectedIncome",
    pageLabel: "commissionSystem.title",
    component: () => (
      <ExpectedIncome title={"commissionSystem.expectedIncome.title"} />
    ),
  },
  {
    id: "Override",
    pageLabel: "commissionSystem.title",
    component: () => <Override title={"commissionSystem.override.title"} />,
  },
  {
    id: "PromotionCriteria",
    pageLabel: "commissionSystem.title",
    component: () => (
      <PromotionCriteria
        title={"commissionSystem.promotionCriteria.title"}
        subtitle={"commissionSystem.promotionCriteria.subtitle"}
      />
    ),
  },
  {
    id: "MaintenanceCriteria",
    pageLabel: "commissionSystem.title",
    component: () => (
      <MaintenanceCriteria
        title={"commissionSystem.maintenanceCriteria.title"}
      />
    ),
  },
  {
    id: "MultiTab",
    pageLabel: "commissionSystem.title",
    component: () => <MultiTab title={"commissionSystem.multitab.title"} />,
  },
  {
    id: "BonusSystem",
    pageLabel: "commissionSystem.title",
    component: () => (
      <BonusSystem title={"commissionSystem.bonusSystem.title"} />
    ),
  },
  {
    id: "QuarterlyBonus",
    pageLabel: "commissionSystem.title",
    component: () => (
      <QuarterlyBonus title={"commissionSystem.quarterlyBonus.title"} />
    ),
  },
  {
    id: "Contest",
    pageLabel: "commissionSystem.title",
    component: () => <Contest title={"commissionSystem.contest.title"} />,
  },
  {
    id: "QuarterlyIncomeCalculator",
    pageLabel: "commissionSystem.title",
    component: () => (
      <QuarterlyIncomeCalculator
        title={"commissionSystem.quaterlyIncomeCalculator.title"}
      />
    ),
  },
];
