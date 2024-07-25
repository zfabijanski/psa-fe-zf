import { FC } from "react";
import styled from "styled-components";
import Table from "../../../commons/Table/Table";

const Container = styled.div`
  height: 100%;
  table {
    width: 100%;
    white-space: pre-wrap;
    tr {
      td:not(:first-child) {
        width: 400px;
        text-align: left;
        padding: 5px 20px;
      }
    }
  }
`;

const tableContent = [
  [
    "commissionSystem.multitab.manager.row1.column1",
    "commissionSystem.multitab.manager.row1.column2",
  ],
  [
    "commissionSystem.multitab.manager.row2.column1",
    "commissionSystem.multitab.manager.row2.column2",
  ],
  [
    "commissionSystem.multitab.manager.row3.column1",
    "commissionSystem.multitab.manager.row3.column2",
  ],
  [
    "commissionSystem.multitab.manager.row4.column1",
    "commissionSystem.multitab.manager.row4.column2",
  ],
  [
    "commissionSystem.multitab.manager.row5.column1",
    "commissionSystem.multitab.manager.row5.column2",
  ],
  ["commissionSystem.multitab.manager.row6.column1"],
];

const Manager: FC = () => {
  return (
    <Container>
      <Table body={tableContent} />
    </Container>
  );
};

export default Manager;
