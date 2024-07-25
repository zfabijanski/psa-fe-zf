import checkPesel from "pesel-check";
import { getAge } from "./dateCalculations";

export const isFirstNameValid = (value: string) => {
  const isStringCorrect =
    /^[A-Za-z \u0104\u0106\u0118\u0141\u0143\u00D3\u015A\u0179\u017B\u0105\u0107\u0119\u0142\u0144\u00F3\u015B\u017A\u017C]{1,64}$/.test(
      value
    );
  const hasIncorrectSpacing = /(^\s)|(\s$)|(\s\s+)/.test(value);

  return isStringCorrect && !hasIncorrectSpacing;
};

export const isLastNameValid = (value: string) => {
  const isStringCorrect =
    /^[A-Za-z\-\u0104\u0106\u0118\u0141\u0143\u00D3\u015A\u0179\u017B\u0105\u0107\u0119\u0142\u0144\u00F3\u015B\u017A\u017C\s]{1,64}$/.test(
      value
    );
  const hasIncorrectSpacing = /(\s{2,})|(\s-\s)|(\s-)|(-\s)|(^-)|(-$)/.test(
    value
  );

  return isStringCorrect && !hasIncorrectSpacing;
};

export const isPeselValid = (value: string) => checkPesel(value);

export const isPassportValid = (value: string) =>
  /^[A-Z]{3,4}\/[a-zA-Z0-9]{1,10}$/.test(value);

export const isBirthdateValid = (value: string) =>
  value ? getAge(value, "years") <= 100 : true;

export const isEmailValid = (value: string) =>
  /^(([^<>()[\]\\.,;:\s@"\u0104\u0106\u0118\u0141\u0143\u00D3\u015A\u0179\u017B\u0105\u0107\u0119\u0142\u0144\u00F3\u015B\u017A\u017C]+(\.[^<>()[\]\\.,;:\s@"\u0104\u0106\u0118\u0141\u0143\u00D3\u015A\u0179\u017B\u0105\u0107\u0119\u0142\u0144\u00F3\u015B\u017A\u017C]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    String(value).toLowerCase()
  );

export const isPhoneValid = (value: string) => /^[0-9]{9}$/.test(value);

export const isSubjectValid = (value: string) => value.length <= 150;

export const isContentValid = (value: string) => value.length <= 2000;
