import { extractPlaceholders } from "./errorMessageResolver";

describe("extractPlaceholders", () => {
  it("extracts singular value from a string", () => {
    expect(
      extractPlaceholders("This has a {singularTest} placeholder")
    ).toEqual(["singularTest"]);
  });

  it("extracts plural value from a string", () => {
    expect(
      extractPlaceholders(
        "This has a {pluralTest, plural, one {# rok} } placeholder"
      )
    ).toEqual(["pluralTest"]);
  });

  it("extracts multiple mixd placeholders", () => {
    expect(
      extractPlaceholders(
        "This has both {singularTest} and {pluralTest, plural, one {# rok} } placeholders."
      )
    ).toEqual(["singularTest", "pluralTest"]);
  });

  it("returns an empty array if no placeholder is found", () => {
    expect(extractPlaceholders("This text has no placeholders.")).toEqual([]);
  });
});
