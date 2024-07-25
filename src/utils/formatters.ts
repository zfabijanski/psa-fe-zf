import moment, { DurationInputArg2 } from "moment";
import { TextTransformationCode } from "../common/features/Survey/Survey.types";

import { WhiteSpace } from "./types";

export const formatDuration = (duration: number, unit: DurationInputArg2) => {
  const isDurationEqualOne = duration === 1;
  const formatted = moment.duration(duration, unit).humanize();
  return isDurationEqualOne ? `1 ${formatted}` : formatted;
};

export const transformStringWithPattern = (
  value: string,
  transformationCode: TextTransformationCode
) => {
  switch (transformationCode) {
    case TextTransformationCode.TTSE1:
      return value.toLowerCase();
    case TextTransformationCode.TTSE2:
      return value.toUpperCase();
    case TextTransformationCode.TTSE3:
      return value.split(" ").map(toTitleCase).join("");
    case TextTransformationCode.TTSE4:
      return toTitleCase(value);
    case TextTransformationCode.TTSE5:
    default:
      return value;
  }
};

export const toTitleCase = (text: string) => {
  const [first = "", ...rest] = text.split("");
  return first.toUpperCase() + rest.join("").toLowerCase();
};

export const capitalizeFirst = (text: string) => {
  const [first = "", ...rest] = text.split("");
  return first.toUpperCase() + rest.join("");
};

export const addNonBreakingSpace = (
  text: string,
  hardSpaceCode: string
): string =>
  text
    .split(" ")
    .map((word) => {
      if (word.length <= 2) {
        return `${word}${hardSpaceCode}`;
      }
      return `${word} `;
    })
    .join("");

export const breakOnSlash = (text: string): string =>
  text
    .split("")
    .map((letter) => {
      if (letter === "/") {
        return `${letter}${WhiteSpace.ZeroWidthSpace}`;
      }
      return letter;
    })
    .join("");

export const addNonBreakingSpaceToNumber = (text: string): string => {
  const pattern = /\d+/;
  return text
    .split(" ")
    .reduce<string[]>((acc: string[], current: string, index: number) => {
      let temp = "";
      if (index === 0) {
        temp = current;
      } else if (pattern.test(acc[index - 1]) && pattern.test(current)) {
        temp = `${WhiteSpace.NonBreakingSpace}${current}`;
      } else {
        temp = ` ${current}`;
      }
      acc.push(temp);
      return acc;
    }, [])
    .join("");
};
