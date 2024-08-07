export interface IBasicCommissionData {
  [key: string]: IDetails;
}

export interface IAnnualCommission {
  label: string;
  value: string;
}

export interface IDetails {
  firstYearCommission: string;
  APE_WN: string;
  annualCommission: IAnnualCommission[];
}

export const protectiveAndSavingsData: IBasicCommissionData = {
  "5": {
    firstYearCommission: "4.00",
    APE_WN: "30.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "2.00" },
      { label: "commissionSystem.basicCommission.3year", value: "" },
      { label: "commissionSystem.basicCommission.4year", value: "" },
      { label: "commissionSystem.basicCommission.5year", value: "" },
      { label: "commissionSystem.basicCommission.6year", value: "" },
      { label: "commissionSystem.basicCommission.7year", value: "" },
    ],
  },
  "6": {
    firstYearCommission: "4.80",
    APE_WN: "30.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "2.00" },
      { label: "commissionSystem.basicCommission.3year", value: "" },
      { label: "commissionSystem.basicCommission.4year", value: "" },
      { label: "commissionSystem.basicCommission.5year", value: "" },
      { label: "commissionSystem.basicCommission.6year", value: "" },
      { label: "commissionSystem.basicCommission.7year", value: "" },
    ],
  },
  "7": {
    firstYearCommission: "5.60",
    APE_WN: "30.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "2.00" },
      { label: "commissionSystem.basicCommission.3year", value: "2.00" },
      { label: "commissionSystem.basicCommission.4year", value: "" },
      { label: "commissionSystem.basicCommission.5year", value: "" },
      { label: "commissionSystem.basicCommission.6year", value: "" },
      { label: "commissionSystem.basicCommission.7year", value: "" },
    ],
  },
  "8": {
    firstYearCommission: "6.40",
    APE_WN: "30.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "2.00" },
      { label: "commissionSystem.basicCommission.3year", value: "2.00" },
      { label: "commissionSystem.basicCommission.4year", value: "" },
      { label: "commissionSystem.basicCommission.5year", value: "" },
      { label: "commissionSystem.basicCommission.6year", value: "" },
      { label: "commissionSystem.basicCommission.7year", value: "" },
    ],
  },
  "9": {
    firstYearCommission: "7.20",
    APE_WN: "30.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "2.00" },
      { label: "commissionSystem.basicCommission.3year", value: "2.00" },
      { label: "commissionSystem.basicCommission.4year", value: "" },
      { label: "commissionSystem.basicCommission.5year", value: "" },
      { label: "commissionSystem.basicCommission.6year", value: "" },
      { label: "commissionSystem.basicCommission.7year", value: "" },
    ],
  },
  "10": {
    firstYearCommission: "8.00",
    APE_WN: "60.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "2.50" },
      { label: "commissionSystem.basicCommission.3year", value: "2.50" },
      { label: "commissionSystem.basicCommission.4year", value: "2.50" },
      { label: "commissionSystem.basicCommission.5year", value: "" },
      { label: "commissionSystem.basicCommission.6year", value: "" },
      { label: "commissionSystem.basicCommission.7year", value: "" },
    ],
  },
  "11": {
    firstYearCommission: "12.75",
    APE_WN: "60.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "3.25" },
      { label: "commissionSystem.basicCommission.3year", value: "3.25" },
      { label: "commissionSystem.basicCommission.4year", value: "3.25" },
      { label: "commissionSystem.basicCommission.5year", value: "" },
      { label: "commissionSystem.basicCommission.6year", value: "" },
      { label: "commissionSystem.basicCommission.7year", value: "" },
    ],
  },
  "12": {
    firstYearCommission: "16.75",
    APE_WN: "60.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "3.75" },
      { label: "commissionSystem.basicCommission.3year", value: "3.75" },
      { label: "commissionSystem.basicCommission.4year", value: "3.75" },
      { label: "commissionSystem.basicCommission.5year", value: "" },
      { label: "commissionSystem.basicCommission.6year", value: "" },
      { label: "commissionSystem.basicCommission.7year", value: "" },
    ],
  },
  "13": {
    firstYearCommission: "21.50",
    APE_WN: "60.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "4.25" },
      { label: "commissionSystem.basicCommission.3year", value: "4.25" },
      { label: "commissionSystem.basicCommission.4year", value: "4.25" },
      { label: "commissionSystem.basicCommission.5year", value: "" },
      { label: "commissionSystem.basicCommission.6year", value: "" },
      { label: "commissionSystem.basicCommission.7year", value: "" },
    ],
  },
  "14": {
    firstYearCommission: "26.50",
    APE_WN: "60.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "4.75" },
      { label: "commissionSystem.basicCommission.3year", value: "4.75" },
      { label: "commissionSystem.basicCommission.4year", value: "4.75" },
      { label: "commissionSystem.basicCommission.5year", value: "" },
      { label: "commissionSystem.basicCommission.6year", value: "" },
      { label: "commissionSystem.basicCommission.7year", value: "" },
    ],
  },
  "15": {
    firstYearCommission: "30.00",
    APE_WN: "60.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "10.00" },
      { label: "commissionSystem.basicCommission.3year", value: "8.00" },
      { label: "commissionSystem.basicCommission.4year", value: "5.00" },
      { label: "commissionSystem.basicCommission.5year", value: "5.00" },
      { label: "commissionSystem.basicCommission.6year", value: "4.00" },
      { label: "commissionSystem.basicCommission.7year", value: "" },
    ],
  },
  "16": {
    firstYearCommission: "33.00",
    APE_WN: "80.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "10.00" },
      { label: "commissionSystem.basicCommission.3year", value: "8.00" },
      { label: "commissionSystem.basicCommission.4year", value: "5.00" },
      { label: "commissionSystem.basicCommission.5year", value: "5.00" },
      { label: "commissionSystem.basicCommission.6year", value: "4.00" },
      { label: "commissionSystem.basicCommission.7year", value: "" },
    ],
  },
  "17": {
    firstYearCommission: "36.00",
    APE_WN: "80.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "10.00" },
      { label: "commissionSystem.basicCommission.3year", value: "8.00" },
      { label: "commissionSystem.basicCommission.4year", value: "5.00" },
      { label: "commissionSystem.basicCommission.5year", value: "5.00" },
      { label: "commissionSystem.basicCommission.6year", value: "4.00" },
      { label: "commissionSystem.basicCommission.7year", value: "" },
    ],
  },
  "18": {
    firstYearCommission: "39.00",
    APE_WN: "80.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "10.00" },
      { label: "commissionSystem.basicCommission.3year", value: "8.00" },
      { label: "commissionSystem.basicCommission.4year", value: "5.00" },
      { label: "commissionSystem.basicCommission.5year", value: "5.00" },
      { label: "commissionSystem.basicCommission.6year", value: "4.00" },
      { label: "commissionSystem.basicCommission.7year", value: "" },
    ],
  },
  "19": {
    firstYearCommission: "42.00",
    APE_WN: "80.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "10.00" },
      { label: "commissionSystem.basicCommission.3year", value: "8.00" },
      { label: "commissionSystem.basicCommission.4year", value: "5.00" },
      { label: "commissionSystem.basicCommission.5year", value: "5.00" },
      { label: "commissionSystem.basicCommission.6year", value: "4.00" },
      { label: "commissionSystem.basicCommission.7year", value: "" },
    ],
  },
  "20": {
    firstYearCommission: "45.00",
    APE_WN: "100.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "10.00" },
      { label: "commissionSystem.basicCommission.3year", value: "10.00" },
      { label: "commissionSystem.basicCommission.4year", value: "5.00" },
      { label: "commissionSystem.basicCommission.5year", value: "5.00" },
      { label: "commissionSystem.basicCommission.6year", value: "4.00" },
      { label: "commissionSystem.basicCommission.7year", value: "4.00" },
    ],
  },
  "21": {
    firstYearCommission: "46.00",
    APE_WN: "100.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "12.00" },
      { label: "commissionSystem.basicCommission.3year", value: "10.00" },
      { label: "commissionSystem.basicCommission.4year", value: "5.00" },
      { label: "commissionSystem.basicCommission.5year", value: "5.00" },
      { label: "commissionSystem.basicCommission.6year", value: "4.00" },
      { label: "commissionSystem.basicCommission.7year", value: "4.00" },
    ],
  },
  "22": {
    firstYearCommission: "47.00",
    APE_WN: "100.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "12.00" },
      { label: "commissionSystem.basicCommission.3year", value: "10.00" },
      { label: "commissionSystem.basicCommission.4year", value: "5.00" },
      { label: "commissionSystem.basicCommission.5year", value: "5.00" },
      { label: "commissionSystem.basicCommission.6year", value: "4.00" },
      { label: "commissionSystem.basicCommission.7year", value: "4.00" },
    ],
  },
  "23": {
    firstYearCommission: "48.00",
    APE_WN: "100.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "12.00" },
      { label: "commissionSystem.basicCommission.3year", value: "10.00" },
      { label: "commissionSystem.basicCommission.4year", value: "5.00" },
      { label: "commissionSystem.basicCommission.5year", value: "5.00" },
      { label: "commissionSystem.basicCommission.6year", value: "4.00" },
      { label: "commissionSystem.basicCommission.7year", value: "4.00" },
    ],
  },
  "24": {
    firstYearCommission: "49.00",
    APE_WN: "100.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "12.00" },
      { label: "commissionSystem.basicCommission.3year", value: "10.00" },
      { label: "commissionSystem.basicCommission.4year", value: "5.00" },
      { label: "commissionSystem.basicCommission.5year", value: "5.00" },
      { label: "commissionSystem.basicCommission.6year", value: "4.00" },
      { label: "commissionSystem.basicCommission.7year", value: "4.00" },
    ],
  },
  "25": {
    firstYearCommission: "50.00",
    APE_WN: "110.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "14.00" },
      { label: "commissionSystem.basicCommission.3year", value: "10.00" },
      { label: "commissionSystem.basicCommission.4year", value: "5.00" },
      { label: "commissionSystem.basicCommission.5year", value: "5.00" },
      { label: "commissionSystem.basicCommission.6year", value: "4.00" },
      { label: "commissionSystem.basicCommission.7year", value: "4.00" },
    ],
  },
  "26": {
    firstYearCommission: "50.00",
    APE_WN: "110.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "14.00" },
      { label: "commissionSystem.basicCommission.3year", value: "10.00" },
      { label: "commissionSystem.basicCommission.4year", value: "5.00" },
      { label: "commissionSystem.basicCommission.5year", value: "5.00" },
      { label: "commissionSystem.basicCommission.6year", value: "4.00" },
      { label: "commissionSystem.basicCommission.7year", value: "4.00" },
    ],
  },
  "27": {
    firstYearCommission: "50.00",
    APE_WN: "110.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "14.00" },
      { label: "commissionSystem.basicCommission.3year", value: "10.00" },
      { label: "commissionSystem.basicCommission.4year", value: "5.00" },
      { label: "commissionSystem.basicCommission.5year", value: "5.00" },
      { label: "commissionSystem.basicCommission.6year", value: "4.00" },
      { label: "commissionSystem.basicCommission.7year", value: "4.00" },
    ],
  },
  "28": {
    firstYearCommission: "50.00",
    APE_WN: "110.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "14.00" },
      { label: "commissionSystem.basicCommission.3year", value: "10.00" },
      { label: "commissionSystem.basicCommission.4year", value: "5.00" },
      { label: "commissionSystem.basicCommission.5year", value: "5.00" },
      { label: "commissionSystem.basicCommission.6year", value: "4.00" },
      { label: "commissionSystem.basicCommission.7year", value: "4.00" },
    ],
  },
  "29": {
    firstYearCommission: "50.00",
    APE_WN: "110.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "14.00" },
      { label: "commissionSystem.basicCommission.3year", value: "10.00" },
      { label: "commissionSystem.basicCommission.4year", value: "5.00" },
      { label: "commissionSystem.basicCommission.5year", value: "5.00" },
      { label: "commissionSystem.basicCommission.6year", value: "4.00" },
      { label: "commissionSystem.basicCommission.7year", value: "4.00" },
    ],
  },
  "30": {
    firstYearCommission: "50.00",
    APE_WN: "120.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "14.00" },
      { label: "commissionSystem.basicCommission.3year", value: "10.00" },
      { label: "commissionSystem.basicCommission.4year", value: "5.00" },
      { label: "commissionSystem.basicCommission.5year", value: "5.00" },
      { label: "commissionSystem.basicCommission.6year", value: "4.00" },
      { label: "commissionSystem.basicCommission.7year", value: "4.00" },
    ],
  },
};

export const protectiveData: IBasicCommissionData = {
  "5": {
    firstYearCommission: "10.00",
    APE_WN: "30.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "4.00" },
      { label: "commissionSystem.basicCommission.3year", value: "" },
      { label: "commissionSystem.basicCommission.4year", value: "" },
      { label: "commissionSystem.basicCommission.5year", value: "" },
      { label: "commissionSystem.basicCommission.6year", value: "" },
      { label: "commissionSystem.basicCommission.7year", value: "" },
    ],
  },
  "6": {
    firstYearCommission: "12.00",
    APE_WN: "30.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "4.00" },
      { label: "commissionSystem.basicCommission.3year", value: "" },
      { label: "commissionSystem.basicCommission.4year", value: "" },
      { label: "commissionSystem.basicCommission.5year", value: "" },
      { label: "commissionSystem.basicCommission.6year", value: "" },
      { label: "commissionSystem.basicCommission.7year", value: "" },
    ],
  },
  "7": {
    firstYearCommission: "14.00",
    APE_WN: "30.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "4.00" },
      { label: "commissionSystem.basicCommission.3year", value: "4.00" },
      { label: "commissionSystem.basicCommission.4year", value: "" },
      { label: "commissionSystem.basicCommission.5year", value: "" },
      { label: "commissionSystem.basicCommission.6year", value: "" },
      { label: "commissionSystem.basicCommission.7year", value: "" },
    ],
  },
  "8": {
    firstYearCommission: "16.00",
    APE_WN: "30.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "4.00" },
      { label: "commissionSystem.basicCommission.3year", value: "4.00" },
      { label: "commissionSystem.basicCommission.4year", value: "" },
      { label: "commissionSystem.basicCommission.5year", value: "" },
      { label: "commissionSystem.basicCommission.6year", value: "" },
      { label: "commissionSystem.basicCommission.7year", value: "" },
    ],
  },
  "9": {
    firstYearCommission: "18.00",
    APE_WN: "30.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "4.00" },
      { label: "commissionSystem.basicCommission.3year", value: "4.00" },
      { label: "commissionSystem.basicCommission.4year", value: "" },
      { label: "commissionSystem.basicCommission.5year", value: "" },
      { label: "commissionSystem.basicCommission.6year", value: "" },
      { label: "commissionSystem.basicCommission.7year", value: "" },
    ],
  },
  "10": {
    firstYearCommission: "20.00",
    APE_WN: "60.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "5.00" },
      { label: "commissionSystem.basicCommission.3year", value: "5.00" },
      { label: "commissionSystem.basicCommission.4year", value: "5.00" },
      { label: "commissionSystem.basicCommission.5year", value: "" },
      { label: "commissionSystem.basicCommission.6year", value: "" },
      { label: "commissionSystem.basicCommission.7year", value: "" },
    ],
  },
  "11": {
    firstYearCommission: "22.00",
    APE_WN: "60.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "5.00" },
      { label: "commissionSystem.basicCommission.3year", value: "5.00" },
      { label: "commissionSystem.basicCommission.4year", value: "5.00" },
      { label: "commissionSystem.basicCommission.5year", value: "" },
      { label: "commissionSystem.basicCommission.6year", value: "" },
      { label: "commissionSystem.basicCommission.7year", value: "" },
    ],
  },
  "12": {
    firstYearCommission: "24.00",
    APE_WN: "60.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "5.00" },
      { label: "commissionSystem.basicCommission.3year", value: "5.00" },
      { label: "commissionSystem.basicCommission.4year", value: "5.00" },
      { label: "commissionSystem.basicCommission.5year", value: "" },
      { label: "commissionSystem.basicCommission.6year", value: "" },
      { label: "commissionSystem.basicCommission.7year", value: "" },
    ],
  },
  "13": {
    firstYearCommission: "26.00",
    APE_WN: "60.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "5.00" },
      { label: "commissionSystem.basicCommission.3year", value: "5.00" },
      { label: "commissionSystem.basicCommission.4year", value: "5.00" },
      { label: "commissionSystem.basicCommission.5year", value: "" },
      { label: "commissionSystem.basicCommission.6year", value: "" },
      { label: "commissionSystem.basicCommission.7year", value: "" },
    ],
  },
  "14": {
    firstYearCommission: "28.00",
    APE_WN: "60.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "5.00" },
      { label: "commissionSystem.basicCommission.3year", value: "5.00" },
      { label: "commissionSystem.basicCommission.4year", value: "5.00" },
      { label: "commissionSystem.basicCommission.5year", value: "" },
      { label: "commissionSystem.basicCommission.6year", value: "" },
      { label: "commissionSystem.basicCommission.7year", value: "" },
    ],
  },
  "15": {
    firstYearCommission: "30.00",
    APE_WN: "60.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "10.00" },
      { label: "commissionSystem.basicCommission.3year", value: "8.00" },
      { label: "commissionSystem.basicCommission.4year", value: "5.00" },
      { label: "commissionSystem.basicCommission.5year", value: "5.00" },
      { label: "commissionSystem.basicCommission.6year", value: "4.00" },
      { label: "commissionSystem.basicCommission.7year", value: "" },
    ],
  },
  "16": {
    firstYearCommission: "33.00",
    APE_WN: "80.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "10.00" },
      { label: "commissionSystem.basicCommission.3year", value: "8.00" },
      { label: "commissionSystem.basicCommission.4year", value: "5.00" },
      { label: "commissionSystem.basicCommission.5year", value: "5.00" },
      { label: "commissionSystem.basicCommission.6year", value: "4.00" },
      { label: "commissionSystem.basicCommission.7year", value: "" },
    ],
  },
  "17": {
    firstYearCommission: "36.00",
    APE_WN: "80.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "10.00" },
      { label: "commissionSystem.basicCommission.3year", value: "8.00" },
      { label: "commissionSystem.basicCommission.4year", value: "5.00" },
      { label: "commissionSystem.basicCommission.5year", value: "5.00" },
      { label: "commissionSystem.basicCommission.6year", value: "4.00" },
      { label: "commissionSystem.basicCommission.7year", value: "" },
    ],
  },
  "18": {
    firstYearCommission: "39.00",
    APE_WN: "80.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "10.00" },
      { label: "commissionSystem.basicCommission.3year", value: "8.00" },
      { label: "commissionSystem.basicCommission.4year", value: "5.00" },
      { label: "commissionSystem.basicCommission.5year", value: "5.00" },
      { label: "commissionSystem.basicCommission.6year", value: "4.00" },
      { label: "commissionSystem.basicCommission.7year", value: "" },
    ],
  },
  "19": {
    firstYearCommission: "42.00",
    APE_WN: "80.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "10.00" },
      { label: "commissionSystem.basicCommission.3year", value: "8.00" },
      { label: "commissionSystem.basicCommission.4year", value: "5.00" },
      { label: "commissionSystem.basicCommission.5year", value: "5.00" },
      { label: "commissionSystem.basicCommission.6year", value: "4.00" },
      { label: "commissionSystem.basicCommission.7year", value: "" },
    ],
  },
  "20": {
    firstYearCommission: "45.00",
    APE_WN: "100.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "10.00" },
      { label: "commissionSystem.basicCommission.3year", value: "10.00" },
      { label: "commissionSystem.basicCommission.4year", value: "5.00" },
      { label: "commissionSystem.basicCommission.5year", value: "5.00" },
      { label: "commissionSystem.basicCommission.6year", value: "4.00" },
      { label: "commissionSystem.basicCommission.7year", value: "4.00" },
    ],
  },
  "21": {
    firstYearCommission: "46.00",
    APE_WN: "100.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "12.00" },
      { label: "commissionSystem.basicCommission.3year", value: "10.00" },
      { label: "commissionSystem.basicCommission.4year", value: "5.00" },
      { label: "commissionSystem.basicCommission.5year", value: "5.00" },
      { label: "commissionSystem.basicCommission.6year", value: "4.00" },
      { label: "commissionSystem.basicCommission.7year", value: "4.00" },
    ],
  },
  "22": {
    firstYearCommission: "47.00",
    APE_WN: "100.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "12.00" },
      { label: "commissionSystem.basicCommission.3year", value: "10.00" },
      { label: "commissionSystem.basicCommission.4year", value: "5.00" },
      { label: "commissionSystem.basicCommission.5year", value: "5.00" },
      { label: "commissionSystem.basicCommission.6year", value: "4.00" },
      { label: "commissionSystem.basicCommission.7year", value: "4.00" },
    ],
  },
  "23": {
    firstYearCommission: "48.00",
    APE_WN: "100.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "12.00" },
      { label: "commissionSystem.basicCommission.3year", value: "10.00" },
      { label: "commissionSystem.basicCommission.4year", value: "5.00" },
      { label: "commissionSystem.basicCommission.5year", value: "5.00" },
      { label: "commissionSystem.basicCommission.6year", value: "4.00" },
      { label: "commissionSystem.basicCommission.7year", value: "4.00" },
    ],
  },
  "24": {
    firstYearCommission: "49.00",
    APE_WN: "100.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "12.00" },
      { label: "commissionSystem.basicCommission.3year", value: "10.00" },
      { label: "commissionSystem.basicCommission.4year", value: "5.00" },
      { label: "commissionSystem.basicCommission.5year", value: "5.00" },
      { label: "commissionSystem.basicCommission.6year", value: "4.00" },
      { label: "commissionSystem.basicCommission.7year", value: "4.00" },
    ],
  },
  "25": {
    firstYearCommission: "50.00",
    APE_WN: "110.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "14.00" },
      { label: "commissionSystem.basicCommission.3year", value: "10.00" },
      { label: "commissionSystem.basicCommission.4year", value: "5.00" },
      { label: "commissionSystem.basicCommission.5year", value: "5.00" },
      { label: "commissionSystem.basicCommission.6year", value: "4.00" },
      { label: "commissionSystem.basicCommission.7year", value: "4.00" },
    ],
  },
  "26": {
    firstYearCommission: "50.00",
    APE_WN: "110.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "14.00" },
      { label: "commissionSystem.basicCommission.3year", value: "10.00" },
      { label: "commissionSystem.basicCommission.4year", value: "5.00" },
      { label: "commissionSystem.basicCommission.5year", value: "5.00" },
      { label: "commissionSystem.basicCommission.6year", value: "4.00" },
      { label: "commissionSystem.basicCommission.7year", value: "4.00" },
    ],
  },
  "27": {
    firstYearCommission: "50.00",
    APE_WN: "110.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "14.00" },
      { label: "commissionSystem.basicCommission.3year", value: "10.00" },
      { label: "commissionSystem.basicCommission.4year", value: "5.00" },
      { label: "commissionSystem.basicCommission.5year", value: "5.00" },
      { label: "commissionSystem.basicCommission.6year", value: "4.00" },
      { label: "commissionSystem.basicCommission.7year", value: "4.00" },
    ],
  },
  "28": {
    firstYearCommission: "50.00",
    APE_WN: "110.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "14.00" },
      { label: "commissionSystem.basicCommission.3year", value: "10.00" },
      { label: "commissionSystem.basicCommission.4year", value: "5.00" },
      { label: "commissionSystem.basicCommission.5year", value: "5.00" },
      { label: "commissionSystem.basicCommission.6year", value: "4.00" },
      { label: "commissionSystem.basicCommission.7year", value: "4.00" },
    ],
  },
  "29": {
    firstYearCommission: "50.00",
    APE_WN: "110.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "14.00" },
      { label: "commissionSystem.basicCommission.3year", value: "10.00" },
      { label: "commissionSystem.basicCommission.4year", value: "5.00" },
      { label: "commissionSystem.basicCommission.5year", value: "5.00" },
      { label: "commissionSystem.basicCommission.6year", value: "4.00" },
      { label: "commissionSystem.basicCommission.7year", value: "4.00" },
    ],
  },
  "30": {
    firstYearCommission: "50.00",
    APE_WN: "120.00",
    annualCommission: [
      { label: "commissionSystem.basicCommission.2year", value: "14.00" },
      { label: "commissionSystem.basicCommission.3year", value: "10.00" },
      { label: "commissionSystem.basicCommission.4year", value: "5.00" },
      { label: "commissionSystem.basicCommission.5year", value: "5.00" },
      { label: "commissionSystem.basicCommission.6year", value: "4.00" },
      { label: "commissionSystem.basicCommission.7year", value: "4.00" },
    ],
  },
};
