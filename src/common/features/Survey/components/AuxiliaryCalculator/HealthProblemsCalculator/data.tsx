import { IHealthProblemData } from "./types";

import BodyBurns from "assets/body-burns.svg";
import Handicapped from "assets/handicapped.svg";
import Hospital1 from "assets/hospital1.svg";
import Hospital2 from "assets/hospital2.svg";
import Hospital3 from "assets/hospital3.svg";
import LegLoss from "assets/leg-loss.svg";
import Skull from "assets/skull.svg";
import VisionLoss from "assets/vision-loss.svg";

export const disabilityData: IHealthProblemData[] = [
  {
    title: "apk.healthProblems.calculator.visionLoss.title",
    image: VisionLoss,
    amount: 40000,
    amountText: "apk.healthProblems.calculator.amountText1",
    details: [
      "apk.healthProblems.calculator.visionLoss.details1",
      "apk.healthProblems.calculator.visionLoss.details2",
      "apk.healthProblems.calculator.visionLoss.details3",
      "apk.healthProblems.calculator.visionLoss.details4",
      "apk.healthProblems.calculator.visionLoss.details5",
    ],
  },
  {
    title: "apk.healthProblems.calculator.bodyBurns.title",
    image: BodyBurns,
    amount: 165000,
    amountText: "apk.healthProblems.calculator.amountText1",
    details: [
      "apk.healthProblems.calculator.bodyBurns.details1",
      "apk.healthProblems.calculator.bodyBurns.details2",
      "apk.healthProblems.calculator.bodyBurns.details3",
      "apk.healthProblems.calculator.bodyBurns.details4",
      "apk.healthProblems.calculator.bodyBurns.details5",
    ],
  },
  {
    title: "apk.healthProblems.calculator.legLoss.title",
    image: LegLoss,
    amount: 69000,
    amountText: "apk.healthProblems.calculator.amountText1",
    details: [
      "apk.healthProblems.calculator.legLoss.details1",
      "apk.healthProblems.calculator.legLoss.details2",
      "apk.healthProblems.calculator.legLoss.details3",
      "apk.healthProblems.calculator.legLoss.details4",
    ],
  },
  {
    title: "apk.healthProblems.calculator.skull.title",
    image: Skull,
    amount: 130000,
    amountText: "apk.healthProblems.calculator.amountText1",
    details: [
      "apk.healthProblems.calculator.skull.details1",
      "apk.healthProblems.calculator.skull.details2",
      "apk.healthProblems.calculator.skull.details3",
      "apk.healthProblems.calculator.skull.details4",
    ],
  },
  {
    title: "apk.healthProblems.calculator.handicap.title",
    image: Handicapped,
    amount: 95000,
    amountText: "apk.healthProblems.calculator.amountText1",
    details: [
      "apk.healthProblems.calculator.handicap.details1",
      "apk.healthProblems.calculator.handicap.details2",
      "apk.healthProblems.calculator.handicap.details3",
      "apk.healthProblems.calculator.handicap.details4",
      "apk.healthProblems.calculator.handicap.details5",
      "apk.healthProblems.calculator.handicap.details6",
    ],
  },
];

export const seriousIllnessData: IHealthProblemData[] = [
  {
    title: "apk.healthProblems.calculator.hospitalExample1.title",
    image: Hospital1,
    amount: 135000,
    amountText: "apk.healthProblems.calculator.amountText2",
    details: [
      "apk.healthProblems.calculator.hospitalExample1.details1",
      "apk.healthProblems.calculator.hospitalExample1.details2",
      "apk.healthProblems.calculator.hospitalExample1.details3",
      "apk.healthProblems.calculator.hospitalExample1.details4",
      "apk.healthProblems.calculator.hospitalExample1.details5",
    ],
  },
  {
    title: "apk.healthProblems.calculator.hospitalExample2.title",
    image: Hospital2,
    amount: 265000,
    amountText: "apk.healthProblems.calculator.amountText2",
    details: [
      "apk.healthProblems.calculator.hospitalExample2.details1",
      "apk.healthProblems.calculator.hospitalExample2.details2",
      "apk.healthProblems.calculator.hospitalExample2.details3",
      "apk.healthProblems.calculator.hospitalExample2.details4",
      "apk.healthProblems.calculator.hospitalExample2.details5",
    ],
  },
  {
    title: "apk.healthProblems.calculator.hospitalExample3.title",
    image: Hospital3,
    amount: 600000,
    amountText: "apk.healthProblems.calculator.amountText2",
    details: [
      "apk.healthProblems.calculator.hospitalExample3.details1",
      "apk.healthProblems.calculator.hospitalExample3.details2",
      "apk.healthProblems.calculator.hospitalExample3.details3",
      "apk.healthProblems.calculator.hospitalExample3.details4",
      "apk.healthProblems.calculator.hospitalExample3.details5",
    ],
  },
];
