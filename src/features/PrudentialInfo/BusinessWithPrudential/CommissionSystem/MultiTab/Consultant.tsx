import React from "react";
import SubTab from "./SubTab";
import { ITabs } from "./types";

const tableContent = {
  tab1: [
    [
      "commissionSystem.multitab.consultant.representative.row1.column1",
      "commissionSystem.multitab.consultant.representative.row1.column2",
    ],
    [
      "commissionSystem.multitab.consultant.representative.row2.column1",
      "commissionSystem.multitab.consultant.representative.row2.column2",
    ],
    ["commissionSystem.multitab.consultant.representative.row3.column1"],
  ],
  tab2: [
    [
      "commissionSystem.multitab.consultant.specialist.row1.column1",
      "commissionSystem.multitab.consultant.specialist.row1.column2",
    ],
    [
      "commissionSystem.multitab.consultant.specialist.row2.column1",
      "commissionSystem.multitab.consultant.specialist.row2.column2",
    ],
    ["commissionSystem.multitab.consultant.specialist.row3.column1"],
  ],
};

const tabs: ITabs[] = [
  {
    id: "tab1",
    text: "commissionSystem.multitab.consultant.representative.header",
  },
  {
    id: "tab2",
    text: "commissionSystem.multitab.consultant.specialist.header",
  },
];

const Consultant = () => {
  return <SubTab tabs={tabs} tableContent={tableContent} />;
};

export default Consultant;
