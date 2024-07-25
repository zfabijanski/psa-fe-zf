export const parseCheckboxValue = (value: "Y" | "N" | null | boolean) =>
  typeof value === "boolean" ? value : value === "Y";
