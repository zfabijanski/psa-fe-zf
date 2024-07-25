import React, { FC } from "react";
import styled from "styled-components/macro";
import PageElementWrapper from "../../../../components/UI/PageElementWrapper";
import Table from "../../commons/Table/Table";
import ViewContainer from "../../commons/ViewContainer";

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;

  table {
    width: 100%;
    height: auto;

    thead {
      span {
        padding: 20px 0 40px;
        padding-bottom: 20px;
        display: block;
        font-size: 22px;
        @media only screen and (max-width: 1280px) {
          font-size: 20px;
        }
      }
      th {
        text-align: center;
        line-height: 1.19;
        white-space: pre-wrap;
      }

      th:nth-child(1) {
        padding-left: 40px;
        span {
          text-align: center;
          width: 80%;
        }
      }

      th:nth-child(2) {
        width: 330px;
        text-transform: none;
      }
    }

    tbody {
      td:first-child {
        padding-left: 20px;
      }
      tr:nth-child(2) td:nth-child(1) {
        span {
          white-space: pre-wrap;
        }
      }
      @media only screen and (max-width: 1280px) {
        span {
          font-size: 15px;
        }
      }
      @media only screen and (max-width: 1024px) {
        tr:nth-child(2) td:nth-child(1) {
          span {
            white-space: unset;
          }
        }
      }
    }
  }
`;

interface IProps {
  title: string;
}

const headers = [
  "commissionSystem.returnPolicy.table.column1.header",
  "commissionSystem.returnPolicy.table.column2.header",
];

const rows = [
  [
    "commissionSystem.returnPolicy.table.column1.row1",
    "commissionSystem.returnPolicy.table.column2.row1",
  ],
  [
    "commissionSystem.returnPolicy.table.column1.row2",
    "commissionSystem.returnPolicy.table.column2.row2",
  ],
  [
    "commissionSystem.returnPolicy.table.column1.row3",
    "commissionSystem.returnPolicy.table.column2.row3",
  ],
  [
    "commissionSystem.returnPolicy.table.column1.row4",
    "commissionSystem.returnPolicy.table.column2.row4",
  ],
];

const ReturnPolicy: FC<IProps> = ({ title }) => {
  return (
    <PageElementWrapper>
      <ViewContainer title={title}>
        <Container>
          <Table header={headers} body={rows} />
        </Container>
      </ViewContainer>
    </PageElementWrapper>
  );
};

export default ReturnPolicy;
