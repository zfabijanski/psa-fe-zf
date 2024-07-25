import { Component } from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { TextEllipsis } from "../../../theme/textEllipsis";
import Row from "./Row";
import SortingArrow from "./SortingArrow";
import { IColumn, IColumnSorting, SortOrder } from "./types";

export const SpanRed = styled.span`
  background-color: ${({ theme }) => theme.newColors.errorBg};
  border-left: 2px solid ${({ theme }) => theme.newColors.error};
  box-shadow: 0px 1px 1px rgba(10, 27, 56, 0.24),
    0px 0px 1px rgba(10, 27, 56, 0.32);
  padding: 0 6px 0 8px;
`;

export const SpanGreen = styled.span`
  background-color: ${({ theme }) => theme.newColors.successBg};
  border-left: 2px solid ${({ theme }) => theme.newColors.success};
  box-shadow: 0px 1px 1px rgba(10, 27, 56, 0.24),
    0px 0px 1px rgba(10, 27, 56, 0.32);
  padding: 0 6px 0 8px;
`;

const ContainerTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 16px;
  line-height: 20px;
  table-layout: fixed;
`;

const TrHeader = styled.tr`
  font-size: 14px;
  line-height: 20px;

  user-select: none;
  border: 1px solid ${({ theme }) => theme.newColors.gray40};
`;

const ThHeader = styled.th<
  Pick<IColumn<void>, "width"> & { isActive?: boolean; onClick?: Function }
>`
  white-space: nowrap;
  padding: 15px 12px;
  width: ${({ width }) => width};
  background-color: ${({ theme }) => theme.newColors.white100};
  color: ${({ theme, isActive }) =>
    isActive ? theme.newColors.gray100 : theme.newColors.gray80};
  font-weight: normal;
  position: sticky;
  z-index: 1;
  top: 0;

  ${({ onClick, theme }) =>
    !!onClick &&
    `
    cursor: pointer;

    &:hover {
      color: ${theme.newColors.gray100};
    }
  `};
`;

const Header = styled.div<{ alignRight?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ alignRight }) => alignRight && "flex-end"};
`;

export interface IPruTableProps<T> {
  primaryKey: keyof T;
  columns: Array<IColumn<T>>;
  data: T[];
  defaultSorting?: IColumnSorting<T>;
  onRowSelect?: (dataRow: T) => void;
  onRowDelete?: (dataRow: T) => void;
  canSelectRow?: (dataRow: T) => boolean;
}

interface IState<T> {
  columns: Array<IColumn<T>>;
  data: T[];
  sorting?: IColumnSorting<T>;
}

export class PruTable<T> extends Component<IPruTableProps<T>, IState<T>> {
  constructor(props: IPruTableProps<T>) {
    super(props);
    this.state = {
      columns: props.columns,
      data: props.data,
    };
  }

  static getDerivedStateFromProps = (
    nextProps: Readonly<IPruTableProps<{}>>,
    nextState: IState<{}>
  ) => {
    const sorting = nextState.sorting || nextProps.defaultSorting;
    if (sorting) {
      const sortingColumn = nextState.columns.find(
        (column) => column.field === sorting.field
      );
      if (sortingColumn) {
        const sorted = nextProps.data.slice().sort(sortingColumn.sorter);
        nextState.data =
          sorting.order === "descend" ? sorted : sorted.reverse();
        nextState.sorting = sorting;
        return nextState;
      }
    } else {
      nextState.data = nextProps.data;
      return nextState;
    }
  };

  private getOrder = (column: IColumn<T>) => {
    const { sorting } = this.state;
    return sorting && sorting.field === column.field
      ? sorting.order
      : undefined;
  };

  private getAlignRight = (column: IColumn<T>) =>
    ["createDate", "lastAccessDate"].includes(column.field.toString());

  private handleSortChange =
    (column: IColumn<T>) => (event?: React.MouseEvent<HTMLElement>) => {
      event?.stopPropagation();

      this.setState((state) => {
        if (state.sorting && state.sorting.field === column.field) {
          return {
            ...state,
            data: state.data.slice().reverse(),
            sorting: {
              field: column.field,
              order: state.sorting.order === "ascend" ? "descend" : "ascend",
            },
          };
        } else {
          return {
            ...state,
            data: state.data.slice().sort(column.sorter),
            sorting: {
              field: column.field,
              order: "descend",
            },
          };
        }
      });
    };

  private handleSelect = (dataRow: T) => () => {
    if (this.props.onRowSelect) {
      this.props.onRowSelect(dataRow);
    }
  };

  private handleDelete = (dataRow: T) => () => {
    if (this.props.onRowDelete) {
      this.props.onRowDelete(dataRow);
    }
  };

  private renderColumnHeader = (column: IColumn<T>, order?: SortOrder) => {
    return (
      <Header alignRight={this.getAlignRight(column)}>
        <TextEllipsis>{column.title}</TextEllipsis>
        {column.sorter && (
          <div>
            <SortingArrow order={order} />
          </div>
        )}
      </Header>
    );
  };

  public render() {
    const { columns, data, sorting } = this.state;
    const { canSelectRow } = this.props;

    const header = (
      <TrHeader>
        {columns.map((column) => (
          <ThHeader
            key={column.field.toString()}
            width={column.width}
            isActive={!!this.getOrder(column)}
            onClick={this.handleSortChange(column)}
            data-testid={`table-header-${column.field.toString()}`}
          >
            {this.renderColumnHeader(column, this.getOrder(column))}
          </ThHeader>
        ))}
        <ThHeader width="86px">
          <Header>
            <FormattedMessage id={"meetingHistory.table.action"} />
          </Header>
        </ThHeader>
      </TrHeader>
    );

    const rows = data.map((dataRow) => (
      <Row
        key={String(dataRow[this.props.primaryKey])}
        primaryKey={this.props.primaryKey}
        dataRow={dataRow}
        columns={columns}
        sorting={sorting}
        onSelect={this.handleSelect(dataRow)}
        onDelete={this.handleDelete(dataRow)}
        isSelectable={canSelectRow === undefined || canSelectRow(dataRow)}
      />
    ));

    return (
      <ContainerTable>
        <thead>{header}</thead>
        <tbody>{rows}</tbody>
      </ContainerTable>
    );
  }
}

export default PruTable;
