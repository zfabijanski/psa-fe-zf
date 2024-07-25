import { FC } from "react";
import { useIntl } from "react-intl";
import styled from "styled-components/macro";
import { addNonBreakingSpace } from "../../../../utils/formatters";
import { WhiteSpace } from "../../../../utils/types";
import TextContainer from "../TextContainer";
import Tick from "../Tick";

type Record = string | boolean;
interface IProps {
  body: Record[][];
  header?: string[];
}

const Tr = styled.tr<{ grayBackground?: boolean }>`
  background-color: ${({ theme, grayBackground }) =>
    grayBackground ? theme.colors.backgroundMain : theme.newColors.white100};
`;

const Td = styled.td<{ textAlign: string; showBorder?: boolean }>`
  border-left: ${({ showBorder, theme }) =>
    showBorder ? `2px dashed ${theme.colors.lightGray};` : "none"};
  span {
    font-size: 16px;
  }
  text-align: ${({ textAlign }) => textAlign};
  &:not(:first-child) {
    width: 152px;
    @media only screen and (max-width: 1280px) {
      width: 140px;
      span {
        font-size: 15px;
      }
    }
  }
  &:first-child {
    padding-left: 10px;
    @media only screen and (max-width: 1280px) {
      span {
        font-size: 15px;
      }
    }
  }
`;

const Th = styled.th<{ showBorder?: boolean }>`
  border-left: ${({ showBorder, theme }) =>
    showBorder ? `2px dashed ${theme.colors.lightGray};` : "none"};
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  span {
    white-space: pre-wrap;
    line-height: 1.22;
  }
`;

const Table: FC<IProps> = ({ header, body }) => {
  const intl = useIntl();

  return (
    <table>
      {header && (
        <thead>
          <Tr>
            {header.map((th, index) => (
              <Th showBorder={index !== 0} key={th}>
                <TextContainer
                  fontSize={24}
                  text={addNonBreakingSpace(
                    intl.formatMessage({ id: th }),
                    WhiteSpace.NonBreakingSpace
                  )}
                />
              </Th>
            ))}
          </Tr>
        </thead>
      )}
      <tbody>
        {body.map((row, rowIndex) => (
          <Tr grayBackground={!(rowIndex % 2)} key={`tr${rowIndex}`}>
            {row.map((td, TdIndex) => {
              const colSpan =
                row.length - 1 === TdIndex &&
                row.length === 1 &&
                typeof td === "string"
                  ? 2
                  : 1;
              const textAlign =
                colSpan === 2 || TdIndex !== 0 ? "center" : "left";
              return (
                <Td
                  showBorder={TdIndex !== 0}
                  key={`td${TdIndex}`}
                  colSpan={colSpan}
                  textAlign={textAlign}
                >
                  {typeof td === "string" ? (
                    <TextContainer
                      fontWeight={"600"}
                      fontSize={16}
                      text={addNonBreakingSpace(
                        intl.formatMessage({ id: td }),
                        WhiteSpace.NonBreakingSpace
                      )}
                    />
                  ) : (
                    <Tick displayTick={td} />
                  )}
                </Td>
              );
            })}
          </Tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
