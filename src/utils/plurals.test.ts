import { monthPlural, shortMonthPlural, yearPlural } from "./plurals";

describe("yearPlural", () => {
  it("should match inlined snapshot", () => {
    expect(yearPlural("testName")).toMatchInlineSnapshot(`
      "{testName, plural,
        one {# rok}
        few {# lata}
        other {# lat}
      }"
    `);
  });
});

describe("monthPlural", () => {
  it("should match inlined snapshot", () => {
    expect(monthPlural("testName")).toMatchInlineSnapshot(`
      "{testName, plural,
        one {# miesiąc}
        few {# miesiące}
        other {# miesięcy}
      }"
    `);
  });
});

describe("shortMonthPlural", () => {
  it("should match inlined snapshot", () => {
    expect(shortMonthPlural("testName")).toMatchInlineSnapshot(`
      "{testName, plural,
        one {# m-c}
        few {# m-ce}
        other {# m-cy}
      }"
    `);
  });
});
