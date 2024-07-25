import { SelectOption } from "components/UI/Select";
import { DropdownSet } from "../../Survey.types";

const produceAnswerOldSet = (
  range: [number, number],
  prefix: string,
  value: string
): SelectOption[] =>
  Array(range[1] - range[0] + 1)
    .fill(0)
    .map((elt, index) => ({
      value: `${prefix + (range[0] + index)}`,
      text: `${range[0] + index} ${value}`,
    }));

const produceNumAnswerSet = (
  range: [number, number],
  prefix: string,
  summand: number = 0
): SelectOption[] =>
  Array(range[1] - range[0] + 1)
    .fill(0)
    .map((elt, index) => ({
      value: `${prefix + (range[0] + index + summand)}`,
      text: `${range[0] + index + summand}`,
    }));

const ANSWER_OLD_LV = [
  { value: "ADQ_ANS_OLD_01", text: "1 miesiąc" },
  ...produceAnswerOldSet([2, 4], "ADQ_ANS_OLD_0", "miesiące"),
  ...produceAnswerOldSet([5, 11], "ADQ_ANS_OLD_0", "miesięcy"),
  { value: "ADQ_ANS_OLD_1", text: "1 rok" },
  ...produceAnswerOldSet([2, 4], "ADQ_ANS_OLD_", "lata"),
  ...produceAnswerOldSet([5, 21], "ADQ_ANS_OLD_", "lat"),
  ...produceAnswerOldSet([22, 24], "ADQ_ANS_OLD_", "lata"),
];

const ANSWER_RETIREMENT_LV = [
  { value: "ADQ_ANS_OLD_1", text: "1 rok" },
  ...produceAnswerOldSet([2, 4], "ADQ_ANS_OLD_", "lata"),
  ...produceAnswerOldSet([5, 21], "ADQ_ANS_OLD_", "lat"),
  ...produceAnswerOldSet([22, 24], "ADQ_ANS_OLD_", "lata"),
  ...produceAnswerOldSet([25, 31], "ADQ_ANS_OLD_", "lat"),
  ...produceAnswerOldSet([32, 34], "ADQ_ANS_OLD_", "lata"),
  ...produceAnswerOldSet([35, 41], "ADQ_ANS_OLD_", "lat"),
  ...produceAnswerOldSet([42, 44], "ADQ_ANS_OLD_", "lata"),
  ...produceAnswerOldSet([45, 51], "ADQ_ANS_OLD_", "lat"),
  ...produceAnswerOldSet([52, 54], "ADQ_ANS_OLD_", "lata"),
  ...produceAnswerOldSet([55, 61], "ADQ_ANS_OLD_", "lat"),
  ...produceAnswerOldSet([62, 64], "ADQ_ANS_OLD_", "lata"),
  ...produceAnswerOldSet([65, 71], "ADQ_ANS_OLD_", "lat"),
  ...produceAnswerOldSet([72, 74], "ADQ_ANS_OLD_", "lata"),
  ...produceAnswerOldSet([75, 81], "ADQ_ANS_OLD_", "lat"),
  ...produceAnswerOldSet([82, 84], "ADQ_ANS_OLD_", "lata"),
  ...produceAnswerOldSet([85, 91], "ADQ_ANS_OLD_", "lat"),
  ...produceAnswerOldSet([92, 94], "ADQ_ANS_OLD_", "lata"),
  ...produceAnswerOldSet([95, 101], "ADQ_ANS_OLD_", "lat"),
  ...produceAnswerOldSet([102, 104], "ADQ_ANS_OLD_", "lata"),
  ...produceAnswerOldSet([105, 120], "ADQ_ANS_OLD_", "lat"),
];

export const options: { [key in DropdownSet]: SelectOption[] } = {
  ANSWER_NUM_0_5_LV: produceNumAnswerSet([0, 5], "ADQ_ANS_NUMBER_"),
  ANSWER_NUM_1_15_LV: produceNumAnswerSet([0, 14], "ADQ_ANS_NUMBER_", 1),
  ANSWER_RETIREMENT_LV,
  ANSWER_OLD_LV,
};
