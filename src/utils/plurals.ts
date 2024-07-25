// These tests ensure that the plural rules are correctly defined according to the ICU Message Syntax.
// See: https://formatjs.io/docs/core-concepts/icu-syntax#plural-format

export const yearPlural = (name: string) => `{${name}, plural,
  one {# rok}
  few {# lata}
  other {# lat}
}`;

export const monthPlural = (name: string) => `{${name}, plural,
  one {# miesiąc}
  few {# miesiące}
  other {# miesięcy}
}`;

export const shortMonthPlural = (name: string) => `{${name}, plural,
  one {# m-c}
  few {# m-ce}
  other {# m-cy}
}`;
