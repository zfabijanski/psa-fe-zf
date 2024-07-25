import React, { FC } from "react";
import ConsultantIcon from "../../../../../assets/icons/consultant-icon.svg";
import { IBonusRow } from "../../../commons/types";
import BonusViewWrapper from "../BonusViewWrapper";
import Table from "./Table";

interface IProps {
  title: string;
}

const texts: IBonusRow[] = [
  {
    header: "commissionSystem.bonusSystem.row1.header",
    content: "commissionSystem.bonusSystem.row1.description",
  },
  {
    header: "commissionSystem.bonusSystem.row2.header",
    content: "commissionSystem.bonusSystem.row2.description",
  },
  {
    header: "commissionSystem.bonusSystem.row3.header",
    content: "commissionSystem.bonusSystem.row3.description",
  },
  {
    header: "commissionSystem.bonusSystem.row4.header",
    content: "commissionSystem.bonusSystem.row4.description",
  },
  { header: "commissionSystem.bonusSystem.row5.header" },
];

const BonusSystem: FC<IProps> = ({ title }) => {
  return (
    <BonusViewWrapper
      title={title}
      header={"commissionSystem.bonusSystem.header"}
      rows={texts}
      bottomText={"commissionSystem.bonusSystem.bottomText"}
      icon={ConsultantIcon}
    >
      <Table />
    </BonusViewWrapper>
  );
};

export default BonusSystem;
