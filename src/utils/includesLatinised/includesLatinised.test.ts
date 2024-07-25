import { includesLatinised } from "./includesLatinised";

describe("includesLatinised", () => {
  it("should find latin substring in latin string", () => {
    expect(includesLatinised("findable", "findable string")).toBe(true);
  });
  it("should find non-latin substring in latin string", () => {
    expect(includesLatinised("ĄąĆćĘęŁłÓóŻżŹź", "AaCcEeLlOoZzZz źdzbło")).toBe(
      true
    );
  });
  it("shouldn't find latin substring in latin string", () => {
    expect(includesLatinised("non-findable", "findable string")).toBe(false);
  });
  it("shouldn't find non-latin substring in latin string", () => {
    expect(includesLatinised("źdzebełko", "male zdzblo")).toBe(false);
  });
});
