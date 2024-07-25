export type Theme = typeof theme;

export const theme = {
  newColors: {
    primary05: "#F9FDFD",
    primary10: "#EDF9F9",
    primary20: "#DCF3F3",
    primary40: "#95D1D1",
    primary80: "#17B0AD",
    primary100: "#055A60",
    primaryDark: "#033D41",
    primaryDisabled: "#78ADB0",
    white100: "#FFFFFF",
    gray5: "#F8F8F8",
    gray10: "#F3F3F3",
    gray20: "#EDEDED",
    gray30: "#E3E3E3",
    gray40: "#D1D1D1",
    gray60: "#999999",
    gray80: "#737373",
    gray90: "#464646",
    gray100: "#2F2F2F",
    grayDark: "#181818",
    inactive: "#9BBDBF",
    mono40: "#D1D1D1",
    success: "#7EBD5F",
    successBg: "#F0F7EC",
    error: "#D13C15",
    errorBg: "#FBEFEC",
    neutral100Default: "#232424",
    secondary100: "#EB5C37",
    secondaryDark: "#D13C15",
    violet: "#7B76B6",
  },
  colors: {
    backgroundMain: "#f3f3f3",
    lightGray: "#e4e4e4",
    gray: "#e3e4e6",
    neutral: "#999",
    darkGray: "#9b9b9b",
    red: "#c00",
    green: "#18ae00",
    textPrimary: "#222",
    textSemitransparent: "rgba(34,34,34,0.55)",
    emerald: "rgb(5,90,96)",
    lightEmerald: "rgb(23,176,173)",
    white: "#fff",
    transparent: "transparent",
  },
  shadows: {
    elevation1:
      "0px 1px 1px rgba(10, 27, 56, 0.24), 0px 0px 1px rgba(10, 27, 56, 0.32)",
    elevation2:
      "0px 1px 2px rgba(10, 27, 56, 0.08), 0px 2px 4px rgba(10, 27, 56, 0.12)",
    elevation3:
      "0px 8px 12px rgba(10, 27, 56, 0.16), 0px 0px 1px rgba(10, 27, 56, 0.32)",
    elevation4:
      "0px 10px 16px rgba(10, 27, 56, 0.16), 0px 0px 1px rgba(10, 27, 56, 0.32)",
    elevation5:
      "0px 18px 28px rgba(10, 27, 56, 0.16), 0px 0px 1px rgba(10, 27, 56, 0.32)",
    inset1:
      "inset 0px 1px 2px rgba(10, 27, 56, 0.08), inset 0px 2px 4px rgba(10, 27, 56, 0.12)",
  },
  breakpoints: {
    // max widths in px
    xl: 1399,
    lg: 1199,
    md: 991,
    sm: 767,
    xs: 575,
  },
  opacityHover: 0.6,
  opacityDisabled: 0.6,
} as const;

export type TDefaultThemeColor = keyof typeof theme.newColors;
