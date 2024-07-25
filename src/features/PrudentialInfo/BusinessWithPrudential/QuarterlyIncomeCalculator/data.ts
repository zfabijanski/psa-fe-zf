import { ILegendData, LegendColor } from "./types";

export const legendData: ILegendData[] = [
  {
    text: "commissionSystem.quaterlyIncomeCalculator.legend.text1",
    color: LegendColor.DarkGray,
  },
  {
    text: "commissionSystem.quaterlyIncomeCalculator.legend.text2",
    color: LegendColor.Black,
  },
  {
    text: "commissionSystem.quaterlyIncomeCalculator.legend.text3",
    color: LegendColor.LightEmerald,
  },
  {
    text: "commissionSystem.quaterlyIncomeCalculator.legend.text4",
    color: LegendColor.LightGray,
  },
];

export const getQuarterlyBonus = (value: number) => {
  if (value >= 0 && value < 18500) {
    return 0;
  } else if (value >= 18500 && value < 28500) {
    return 0.08;
  } else if (value >= 28500 && value < 38500) {
    return 0.12;
  } else if (value >= 38500 && value < 65000) {
    return 0.16;
  } else {
    return 0.18;
  }
};

export const getBalanceValue = (value: number) => {
  if (value >= 0 && value < 5) {
    return 0.1;
  } else if (value >= 5 && value <= 9) {
    return 0.3;
  } else if (value >= 10 && value <= 15) {
    return 0.6;
  } else if (value >= 16 && value <= 19) {
    return 0.8;
  } else if (value >= 20 && value <= 24) {
    return 1;
  } else if (value >= 25 && value <= 29) {
    return 1.1;
  } else if (value >= 30 && value <= 70) {
    return 1.2;
  } else {
    return 0;
  }
};

export const getMonthlyBonus = (apeWn: number, month: number) => {
  if (month > 12 || apeWn < 3000) {
    return 0;
  } else if (apeWn >= 3000 && apeWn < 4000) {
    return monthlyBonusData[4000][month];
  } else if (apeWn >= 4000 && apeWn < 5000) {
    return monthlyBonusData[4000][month];
  } else if (apeWn >= 5000 && apeWn < 8000) {
    return monthlyBonusData[5000][month];
  } else if (apeWn >= 8000 && apeWn < 11000) {
    return monthlyBonusData[8000][month];
  } else if (apeWn >= 11000 && apeWn < 14000) {
    return monthlyBonusData[11000][month];
  } else {
    return monthlyBonusData[14000][month];
  }
};

export const monthlyBonusData: Record<number, Record<number, number>> = {
  3000: {
    1: 1000,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
    13: 0,
  },
  4000: {
    1: 1000,
    2: 1000,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
    13: 0,
  },
  5000: {
    1: 1000,
    2: 1000,
    3: 1000,
    4: 1000,
    5: 1000,
    6: 1000,
    7: 1000,
    8: 1000,
    9: 1000,
    10: 1000,
    11: 1000,
    12: 1000,
    13: 0,
  },
  8000: {
    1: 1250,
    2: 1250,
    3: 1250,
    4: 1250,
    5: 1250,
    6: 1250,
    7: 1250,
    8: 1250,
    9: 1250,
    10: 1250,
    11: 1250,
    12: 1250,
    13: 0,
  },
  11000: {
    1: 1500,
    2: 1500,
    3: 1500,
    4: 1500,
    5: 1500,
    6: 1500,
    7: 1500,
    8: 1500,
    9: 1500,
    10: 1500,
    11: 1500,
    12: 1500,
    13: 0,
  },
  14000: {
    1: 2000,
    2: 2000,
    3: 2000,
    4: 2000,
    5: 2000,
    6: 2000,
    7: 2000,
    8: 2000,
    9: 2000,
    10: 2000,
    11: 2000,
    12: 2000,
    13: 0,
  },
};

export const commisionData: Record<number, number> = {
  1: 0.02,
  2: 0.04,
  3: 0.06,
  4: 0.08,
  5: 0.1,
  6: 0.12,
  7: 0.14,
  8: 0.16,
  9: 0.18,
  10: 0.2,
  11: 0.22,
  12: 0.24,
  13: 0.26,
  14: 0.28,
  15: 0.3,
  16: 0.33,
  17: 0.36,
  18: 0.39,
  19: 0.42,
  20: 0.45,
  21: 0.46,
  22: 0.47,
  23: 0.48,
  24: 0.49,
  25: 0.5,
  26: 0.5,
  27: 0.5,
  28: 0.5,
  29: 0.5,
  30: 0.5,
  31: 0.5,
  32: 0.5,
  33: 0.5,
  34: 0.5,
  35: 0.5,
  36: 0.5,
  37: 0.5,
  38: 0.5,
  39: 0.5,
  40: 0.5,
  41: 0.5,
  42: 0.5,
  43: 0.5,
  44: 0.5,
  45: 0.5,
  46: 0.5,
  47: 0.5,
  48: 0.5,
  49: 0.5,
  50: 0.5,
  51: 0.5,
  52: 0.5,
  53: 0.5,
  54: 0.5,
  55: 0.5,
  56: 0.5,
  57: 0.5,
  58: 0.5,
  59: 0.5,
  60: 0.5,
};
