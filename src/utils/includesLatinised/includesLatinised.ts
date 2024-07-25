export const includesLatinised = (
  searchString: string,
  wholeString: string
) => {
  if (!searchString.length) {
    return true;
  }

  const wholeStringLatinised = latinise(wholeString.toLowerCase());
  const searchStringLatinised = latinise(searchString.toLowerCase());
  return wholeStringLatinised.indexOf(searchStringLatinised) !== -1;
};

const latinise = (value: string) => {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\u0141/g, "L")
    .replace(/\u0142/g, "l");
};
