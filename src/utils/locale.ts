const LOCALE = "pl-PL";

export const getLocale = () => {
  return LOCALE;
};

export const localizeNumber = (value: string | number | undefined): number => {
  let result = value ?? "";

  if (typeof value === "string") {
    switch (LOCALE) {
      case "pl-PL":
        result = value.replace(",", ".").replaceAll(" ", "");
    }
  }
  return result === "" ? NaN : Number(result);
};
