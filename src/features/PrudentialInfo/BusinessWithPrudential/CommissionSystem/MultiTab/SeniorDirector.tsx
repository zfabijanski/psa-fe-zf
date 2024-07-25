import SubTab from "./SubTab";
import { ITabs } from "./types";

const tableContent = {
  tab1: [
    [
      "commissionSystem.multitab.seniorDirector.standard.row1.column1",
      "commissionSystem.multitab.seniorDirector.standard.row1.column2",
    ],
    [
      "commissionSystem.multitab.seniorDirector.standard.row2.column1",
      "commissionSystem.multitab.seniorDirector.standard.row2.column2",
    ],
    [
      "commissionSystem.multitab.seniorDirector.standard.row3.column1",
      "commissionSystem.multitab.seniorDirector.standard.row3.column2",
    ],
    [
      "commissionSystem.multitab.seniorDirector.standard.row4.column1",
      "commissionSystem.multitab.seniorDirector.standard.row4.column2",
    ],
    [
      "commissionSystem.multitab.seniorDirector.standard.row5.column1",
      "commissionSystem.multitab.seniorDirector.standard.row5.column2",
    ],
    [
      "commissionSystem.multitab.seniorDirector.standard.row6.column1",
      "commissionSystem.multitab.seniorDirector.standard.row6.column2",
    ],
    ["commissionSystem.multitab.seniorDirector.standard.row7.column1"],
  ],
  tab2: [
    [
      "commissionSystem.multitab.seniorDirector.alternative.row1.column1",
      "commissionSystem.multitab.seniorDirector.alternative.row1.column2",
    ],
    [
      "commissionSystem.multitab.seniorDirector.alternative.row2.column1",
      "commissionSystem.multitab.seniorDirector.alternative.row2.column2",
    ],
    [
      "commissionSystem.multitab.seniorDirector.alternative.row3.column1",
      "commissionSystem.multitab.seniorDirector.alternative.row3.column2",
    ],
    [
      "commissionSystem.multitab.seniorDirector.alternative.row4.column1",
      "commissionSystem.multitab.seniorDirector.alternative.row4.column2",
    ],
    [
      "commissionSystem.multitab.seniorDirector.alternative.row5.column1",
      "commissionSystem.multitab.seniorDirector.alternative.row5.column2",
    ],
    [
      "commissionSystem.multitab.seniorDirector.alternative.row6.column1",
      "commissionSystem.multitab.seniorDirector.alternative.row6.column2",
    ],
    ["commissionSystem.multitab.seniorDirector.alternative.row7.column1"],
  ],
};

const tabs: ITabs[] = [
  {
    id: "tab1",
    text: "commissionSystem.multitab.seniorDirector.standard.header",
  },
  {
    id: "tab2",
    text: "commissionSystem.multitab.seniorDirector.alternative.header",
  },
];

const SeniorDirector = () => {
  return <SubTab tabs={tabs} tableContent={tableContent} />;
};

export default SeniorDirector;
