import React, { Component } from "react";
import styled from "styled-components";
import { textEllipsis } from "../../../theme/textEllipsis";
import { Icon } from "../Icon";
import { IColumn, IColumnSorting } from "./types";

interface ITr {
  isSelectable?: boolean;
}

const Tr = styled.tr<ITr>`
  cursor: ${({ isSelectable }) => (isSelectable ? "pointer" : "auto")};
  border: 1px solid ${({ theme }) => theme.newColors.gray40};

  &:hover > * {
    background-color: ${({ theme }) => theme.newColors.gray5};
  }
`;

const Td = styled.td<{ isActive?: boolean; alignRight?: boolean }>`
  padding: 13px 24px 13px 12px;
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.textPrimary : theme.newColors.neutral100Default};
  font-weight: ${({ isActive }) => isActive && "600"};
  text-align: ${({ alignRight }) => alignRight && "right"};
  ${textEllipsis}
`;

const TdRight = styled(Td)`
  text-align: left;
  cursor: pointer;
`;

const IconWrapper = styled.div`
  background-color: ${({ theme }) => theme.newColors.white100};
  height: 28px;
  width: 28px;
  display: flex;
  justify-content: center;
  border: 2px solid ${({ theme }) => theme.newColors.white100};

  & path {
    stroke-width: 2px;
  }

  &:hover {
    border-color: ${({ theme }) => theme.newColors.primary100};
    background-color: ${({ theme }) => theme.newColors.primary05};

    & path {
      stroke: ${({ theme }) => theme.newColors.primary100};
    }
  }

  &:disabled {
    border-color: ${({ theme }) => theme.newColors.gray30};
    background-color: ${({ theme }) => theme.newColors.gray20};
  }
`;

interface IRowProps<T> {
  primaryKey: keyof T;
  dataRow: T;
  columns: Array<IColumn<T>>;
  sorting: IColumnSorting<T> | undefined;
  onSelect: () => void;
  onDelete: () => void;
  isSelectable?: boolean;
}

class Row<T> extends Component<IRowProps<T>> {
  private isSelectable = () =>
    this.props.isSelectable !== undefined ? this.props.isSelectable : true;

  private getAlignRight = (column: IColumn<T>) =>
    ["createDate", "lastAccessDate"].includes(column.field.toString());

  private getOrder = (column: IColumn<T>) => {
    const { sorting } = this.props;
    return sorting && sorting.field === column.field
      ? sorting.order
      : undefined;
  };

  private handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    this.props.onDelete();
  };

  private handleSelect = () => {
    if (this.isSelectable()) {
      this.props.onSelect();
    }
  };

  public render() {
    const { dataRow, columns } = this.props;

    const renderCell = (row: T, column: IColumn<T>) => {
      if (column.render) {
        return column.render(row);
      } else {
        return <>{row[column.field] || "-"}</>;
      }
    };

    return (
      <Tr
        key={String(dataRow[this.props.primaryKey])}
        onClick={this.handleSelect}
        isSelectable={this.isSelectable()}
      >
        {columns.map((column, index) => (
          <Td
            key={`${dataRow[this.props.primaryKey]}-${index}`}
            isActive={!!this.getOrder(column)}
            alignRight={this.getAlignRight(column)}
          >
            {renderCell(dataRow, column)}
          </Td>
        ))}
        <TdRight onClick={this.handleDelete} data-testid="delete-button">
          <IconWrapper>
            <Icon name="trash" width={16} />
          </IconWrapper>
        </TdRight>
      </Tr>
    );
  }
}

export default Row;
