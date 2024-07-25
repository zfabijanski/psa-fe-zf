import React, { FC } from "react";
import ManagerIcon from "../../../../assets/icons/manager-icon.svg";
import { IBonusRow } from "../../commons/types";
import BonusViewWrapper from "./BonusViewWrapper";

interface IProps {
  title: string;
}

const texts: IBonusRow[] = [
  {
    header: "commissionSystem.quarterlyBonus.row1.header",
    content: "commissionSystem.quarterlyBonus.row1.description",
  },
  {
    header: "commissionSystem.quarterlyBonus.row2.header",
    content: "commissionSystem.quarterlyBonus.row2.description",
  },
];

const QuarterlyBonus: FC<IProps> = ({ title }) => {
  return (
    <BonusViewWrapper
      title={title}
      header={"commissionSystem.quarterlyBonus.header"}
      rows={texts}
      bottomText={"commissionSystem.quarterlyBonus.bottomText"}
      icon={ManagerIcon}
    />
  );
};

export default QuarterlyBonus;
