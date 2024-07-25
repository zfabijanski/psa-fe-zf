import React, { FC } from "react";
import styled from "styled-components";
import TextContainer from "../../../commons/TextContainer";

const Container = styled.div`
  margin-top: 35px;
  padding: 0 20px 20px 20px;
  table {
    width: 100%;
  }
  th,
  td {
    border-width: 2px;
    border-color: ${({ theme }) => theme.colors.lightGray};
    border-top-style: solid;
    border-right-style: dotted;
    border-bottom-style: solid;

    &:first-child {
      border-left-style: dotted;
    }
  }

  span {
    display: block;
    text-align: center;
  }

  @media only screen and (max-width: 1280px) {
    th span {
      font-size: 22px;
    }
    td span {
      font-size: 15px;
    }
  }
`;

interface ITableRow {
  value: string;
  rowSpan?: number;
}

const tableRows: ITableRow[][] = [
  [
    { value: "commissionSystem.bonusSystem.table.col1.row1" },
    { value: "commissionSystem.bonusSystem.table.col2.row1", rowSpan: 3 },
    { value: "commissionSystem.bonusSystem.table.col3.row1" },
    { value: "commissionSystem.bonusSystem.table.col4.row1", rowSpan: 3 },
  ],
  [
    { value: "commissionSystem.bonusSystem.table.col1.row2" },
    { value: "commissionSystem.bonusSystem.table.col3.row2" },
  ],
  [
    { value: "commissionSystem.bonusSystem.table.col1.row3", rowSpan: 4 },
    { value: "commissionSystem.bonusSystem.table.col3.row3" },
  ],
  [
    { value: "commissionSystem.bonusSystem.table.col2.row4" },
    { value: "commissionSystem.bonusSystem.table.col3.row4" },
    { value: "commissionSystem.bonusSystem.table.col4.row4" },
  ],
  [
    { value: "commissionSystem.bonusSystem.table.col2.row5" },
    { value: "commissionSystem.bonusSystem.table.col3.row5" },
    { value: "commissionSystem.bonusSystem.table.col4.row5" },
  ],
  [
    { value: "commissionSystem.bonusSystem.table.col2.row6" },
    { value: "commissionSystem.bonusSystem.table.col3.row6" },
    { value: "commissionSystem.bonusSystem.table.col4.row6" },
  ],
];

const headers = [
  "commissionSystem.bonusSystem.table.col1.header",
  "commissionSystem.bonusSystem.table.col2.header",
  "commissionSystem.bonusSystem.table.col3.header",
  "commissionSystem.bonusSystem.table.col4.header",
];

const Table: FC = () => {
  return (
    <Container>
      <table>
        <thead>
          <tr>
            {headers.map((th) => (
              <th key={th}>
                <TextContainer fontSize={24} translationKey={th} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableRows.map((tr, trIndex) => (
            <tr key={`row${trIndex}`}>
              {tr.map((td) => (
                <td key={td.value} rowSpan={td.rowSpan}>
                  <TextContainer
                    fontWeight={"600"}
                    fontSize={16}
                    translationKey={td.value}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default Table;
