import { useEffect, useState } from "react";
import {
  commisionData,
  getBalanceValue,
  getMonthlyBonus,
  getQuarterlyBonus,
} from "../features/PrudentialInfo/BusinessWithPrudential/QuarterlyIncomeCalculator/data";

export const useQuarterlyIncome = (
  duration: number,
  colaborationMonth: number,
  policyNumber: number,
  APEperPolicy: number
) => {
  const [
    firstYearCommisionWithoutReserve,
    setFirstYearCommisionWithoutReserve,
  ] = useState(0);
  const [bonus1, setBonus1] = useState(0);
  const [bonus2, setBonus2] = useState(0);
  const [bonus3, setBonus3] = useState(0);
  const [individualCommisionPercentage, setIndividualCommisionPercentage] =
    useState(0);
  const [halfReserve, setHalfReserve] = useState(0);
  const [percentageBonus, setPercentageBonus] = useState(0);
  const [quarterlyAPE, setQuarterlyAPE] = useState(0);

  useEffect(() => {
    const APE = policyNumber * APEperPolicy;
    const balance = getBalanceValue(duration);
    const APE_WN = APE * balance;
    setQuarterlyAPE(APE_WN * 3);
    const commisionPercentage = commisionData[duration] || 0;
    const firstYearCommision =
      policyNumber * APEperPolicy * commisionPercentage;
    const unitCommision = firstYearCommision / policyNumber;
    const reserve =
      unitCommision > 2500 ? (unitCommision - 2500) * policyNumber : 0;

    // I - Prowizja uroczniona
    setFirstYearCommisionWithoutReserve(firstYearCommision - reserve);
    const wholeReserve = reserve * 3;
    setHalfReserve(wholeReserve / 2);

    // II - Dodatkowa miesięczna premia
    setBonus1(getMonthlyBonus(APE_WN, colaborationMonth));
    setBonus2(getMonthlyBonus(APE_WN, colaborationMonth + 1));
    setBonus3(getMonthlyBonus(APE_WN, colaborationMonth + 2));

    setPercentageBonus(getQuarterlyBonus(quarterlyAPE));

    // III - Indywidualna miesięczna premia
    setIndividualCommisionPercentage(quarterlyAPE * percentageBonus);
  }, [
    duration,
    colaborationMonth,
    policyNumber,
    APEperPolicy,
    percentageBonus,
    quarterlyAPE,
  ]);

  return [
    Math.round(firstYearCommisionWithoutReserve),
    Math.round(bonus1),
    Math.round(bonus2),
    Math.round(bonus3),
    Math.round(individualCommisionPercentage),
    Math.round(halfReserve),
    percentageBonus,
    Math.round(quarterlyAPE),
  ];
};
