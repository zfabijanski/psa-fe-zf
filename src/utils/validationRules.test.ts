import {
  isContentValid,
  isEmailValid,
  isFirstNameValid,
  isLastNameValid,
  isPeselValid,
  isPhoneValid,
  isSubjectValid,
} from "./validationRules";

describe("Validating first name", () => {
  it("should pass on valid value", () => {
    expect(isFirstNameValid("Joanna")).toBe(true);
    expect(isFirstNameValid("Joanna Malgorzata")).toBe(true);
    expect(isFirstNameValid("Joanna Ziółkowska")).toBe(true);
    expect(isFirstNameValid("asia")).toBe(true);
    expect(isFirstNameValid("a".repeat(64))).toBe(true);
  });

  it("should fail on invalid value", () => {
    expect(isFirstNameValid("")).toBe(false);
    expect(isFirstNameValid("Asia19")).toBe(false);
    expect(isFirstNameValid("@#$@$@#@#%")).toBe(false);
    expect(isFirstNameValid("a".repeat(65))).toBe(false);
    expect(isFirstNameValid(" ")).toBe(false);
    expect(isFirstNameValid("Jan  Kowalski")).toBe(false);
    expect(isFirstNameValid("Jan ")).toBe(false);
    expect(isFirstNameValid(" Jan")).toBe(false);
  });
});

describe("Validating last name", () => {
  it("should pass on valid value", () => {
    expect(isLastNameValid("Tomaszewicz")).toBe(true);
    expect(isLastNameValid("Tomaszewicz-Ziółkowska")).toBe(true);
    expect(isLastNameValid("a".repeat(64))).toBe(true);
    expect(isLastNameValid("Tomasz Ziółkowska")).toBe(true);
    expect(isLastNameValid("Tomasz Ziółkowska Mariot")).toBe(true);
    expect(isLastNameValid("Tomasz Ziółkowska-Mariot")).toBe(true);
  });
  it("should fail on invalid value", () => {
    expect(isLastNameValid("")).toBe(false);
    expect(isLastNameValid("Tomaszewicz - Zalewska")).toBe(false);
    expect(isLastNameValid("12345")).toBe(false);
    expect(isLastNameValid("@#$@$@#@#%")).toBe(false);
    expect(isLastNameValid("a".repeat(65))).toBe(false);
    expect(isLastNameValid("Tomasz   Ziółkowska")).toBe(false);
    expect(isLastNameValid("Tomaszewicz -Ziółkowska")).toBe(false);
    expect(isLastNameValid("Tomaszewicz- Ziółkowska")).toBe(false);
    expect(isLastNameValid("-")).toBe(false);
    expect(isLastNameValid("Tomaaszewicz-")).toBe(false);
    expect(isLastNameValid("-Ziółkowska")).toBe(false);
    expect(isLastNameValid(" - ")).toBe(false);
  });
});

describe("Validating pesel", () => {
  it("should pass on valid value", () => {
    expect(isPeselValid("98090847759")).toBe(true);
    expect(isPeselValid("79100285873")).toBe(true);
    expect(isPeselValid("58092197597")).toBe(true);
  });

  it("should fail on invalid value", () => {
    expect(isPeselValid("9821309848")).toBe(false);
    expect(isPeselValid("-821309848")).toBe(false);
    expect(isPeselValid("0")).toBe(false);
  });
});

describe("Validating email", () => {
  it("should pass on valid value", () => {
    expect(isEmailValid("koteczek98@gmail.com")).toBe(true);
    expect(isEmailValid("alina-malina@wp.pl")).toBe(true);
    expect(isEmailValid("Hieronim.Wojciechowski@prudential.pl")).toBe(true);
    expect(isEmailValid("Hieronim.Wojciechowski@prudential.pl")).toBe(true);
  });

  it("should fail on invalid value", () => {
    expect(isEmailValid("")).toBe(false);
    expect(isEmailValid("pusty")).toBe(false);
    expect(isEmailValid("pusty@")).toBe(false);
    expect(isEmailValid("pusty@.wp.pl")).toBe(false);
    expect(isEmailValid("pusty.wp.123")).toBe(false);
  });
});

describe("Validating phone", () => {
  it("should pass on valid value", () => {
    expect(isPhoneValid("718123456")).toBe(true);
  });

  it("should fail on invalid value", () => {
    expect(isPhoneValid("12")).toBe(false);
    expect(isPhoneValid("eeeeeeeee+")).toBe(false);
  });
});

describe("Validating subject", () => {
  it("should pass on valid value", () => {
    expect(isSubjectValid("a".repeat(150))).toBe(true);
    expect(isSubjectValid("-")).toBe(true);
  });

  it("should fail on invalid value", () => {
    expect(isSubjectValid("a".repeat(151))).toBe(false);
  });
});

describe("Validating content", () => {
  it("should pass on valid value", () => {
    expect(isContentValid("a".repeat(2000))).toBe(true);
    expect(isContentValid("-")).toBe(true);
  });

  it("should fail on invalid value", () => {
    expect(isContentValid("a".repeat(2001))).toBe(false);
  });
});
