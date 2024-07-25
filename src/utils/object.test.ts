import { flatObject } from "./object";

describe("Function flatObject", () => {
  it("should return flatten object", () => {
    const result = {};
    const value = {
      a: 0,
      b: {
        c: "stringA",
        d: "stringB",
      },
      e: {
        f: 1,
        g: {
          h: "stringH",
          i: 2,
        },
      },
    };
    const expectedResult = {
      a: 0,
      b_c: "stringA",
      b_d: "stringB",
      e_f: 1,
      e_g_h: "stringH",
      e_g_i: 2,
    };

    flatObject(value, result);
    expect(result).toEqual(expectedResult);
  });
});
