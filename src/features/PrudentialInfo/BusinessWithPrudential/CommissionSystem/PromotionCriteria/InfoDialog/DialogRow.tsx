import React, { FC } from "react";
import { useIntl } from "react-intl";
import styled from "styled-components/macro";
import { addNonBreakingSpace } from "../../../../../../utils/formatters";
import { WhiteSpace } from "../../../../../../utils/types";
import TextContainer from "../../../../commons/TextContainer";
import { IRow } from "../types";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  background-color: ${({ theme }) => theme.newColors.gray100};

  & > div {
    &:first-child {
      border-right: ${({ theme }) => `2px dashed ${theme.colors.darkGray}`};
    }
  }
`;

const SubGrid = styled.div<{
  displayBorder?: boolean;
  removePadding?: boolean;
}>`
  padding: ${({ removePadding }) =>
    removePadding ? "0px" : "20px 10px 10px 20px"};
  border-bottom: ${({ theme, displayBorder }) =>
    displayBorder ? `2px dashed ${theme.colors.darkGray}` : "none"};
`;

interface IProps extends IRow {
  lastRow?: boolean;
}

const DialogRow: FC<IProps> = ({ col1, col2, lastRow }) => {
  const intl = useIntl();
  const getTextWithWhiteSpace = (id: string) =>
    addNonBreakingSpace(
      intl.formatMessage({ id }),
      WhiteSpace.NonBreakingSpace
    );
  return (
    <Container>
      <SubGrid key={"firstCol"} displayBorder={!lastRow}>
        <TextContainer
          fontWeight={"600"}
          fontSize={18}
          text={getTextWithWhiteSpace(col1)}
        />
      </SubGrid>
      <SubGrid key={"secondCol"} displayBorder={!lastRow} removePadding={true}>
        {Array.isArray(col2) ? (
          col2.map((elt, index) => (
            <SubGrid key={elt} displayBorder={index !== col2.length - 1}>
              <TextContainer
                fontWeight={"600"}
                fontSize={18}
                text={getTextWithWhiteSpace(elt)}
              />
            </SubGrid>
          ))
        ) : (
          <SubGrid displayBorder={false}>
            <TextContainer
              fontWeight={"600"}
              fontSize={18}
              text={getTextWithWhiteSpace(col2)}
            />
          </SubGrid>
        )}
      </SubGrid>
    </Container>
  );
};

export default DialogRow;
