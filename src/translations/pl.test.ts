import { plMessages } from "./pl";
import { createIntl } from "react-intl";

describe("Polish translations", () => {
  it.each([
    ["calculator.validation.6101.duration.TOO_LOW", { yearsMin: 1, monthsMin: 3 }, "Za krótki okres umowy. Najkrótszy możliwy to 1 rok, 3 m-ce."],
    ["calculator.validation.6101.duration.ADDITIONAL_COVER_DURATION_EXCEEDS_MAIN_COVER", { yearsMax: 2, monthsMax: 1 }, "Czas trwania umowy jest dłuższy niż umowy głównej wynoszący 2 lata, 1 miesiąc."],
    ["calculator.validation.additionalLifeAssureds.covers.checked.INSURED_TOO_YOUNG", { minInsuredAge: 22 }, "Zawarcie umowy niemożliwe ze względu na wiek. Minimalny wiek Ubezpieczonego to 22 lata."],
    ["calculator.validation.additionalLifeAssureds.covers.checked.CICHILD.INSURED_TOO_YOUNG", { minInsuredAge: 22 }, "Zawarcie umowy niemożliwe ze względu na wiek. Minimalny wiek Ubezpieczonego to 22 m-ce."],
    ["calculator.validation.duration.TOO_LOW", { yearsMin: 1 }, "Za krótki okres umowy. Najkrótszy możliwy to 1 rok."],
    ["calculator.validation.mainInsured.covers.checked.CICHILD.INSURED_TOO_YOUNG", { minInsuredAge: 49 }, "Zawarcie umowy niemożliwe ze względu na wiek. Minimalny wiek Ubezpieczonego to 49 m-cy."],
    ["commissionSystem.basicCommission.tab.header", { duration: 102 }, "Czas trwania umowy: 102 lata"],
  ])(`Key: %s`, (id, values, expected) => {
    const { formatMessage } = createIntl({ locale: "pl", messages: plMessages, defaultLocale: "pl" });
    expect(formatMessage({ id }, values)).toEqual(expected);
  });
});
