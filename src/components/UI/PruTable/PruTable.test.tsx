import { PruTable, IPruTableProps, SpanRed, SpanGreen } from "./PruTable";
import { SortingArrow } from "./SortingArrow";
import { render, screen, fireEvent } from "testUtils";

const mockOnRowSelect = jest.fn();
const mockORowDelete = jest.fn();
const mockCanSelectRow = jest.fn();

const testDataSet: { id: string }[] = [
  { id: "test1" },
  { id: "test2" },
  { id: "test3" },
];

const defaultProps: IPruTableProps<{ id: string }> = {
  primaryKey: "id",
  data: testDataSet,
  columns: [
    {
      field: "id",
      title: "ID",
      width: "100px",
    },
  ],
  onRowSelect: mockOnRowSelect,
  onRowDelete: mockORowDelete,
  canSelectRow: mockCanSelectRow,
};

const setup = (props: Partial<IPruTableProps<{ id: string }>> = {}) =>
  render(<PruTable {...defaultProps} {...props} />);

describe("PruTable", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it("should call onRowSelect when row is selected", () => {
    setup();
    fireEvent.click(screen.getByText("test1"));
    expect(mockOnRowSelect).toHaveBeenCalledTimes(1);
  });

  it("should call onRowDelete when row is deleted", () => {
    setup();
    fireEvent.click(screen.getAllByTestId("delete-button")[0]);
    expect(mockORowDelete).toHaveBeenCalledTimes(1);
  });

  it("should call canSelectRow when mounted", () => {
    setup();
    expect(mockCanSelectRow).toHaveBeenCalled();
  });

  it("should allow to onRowSelect to be undefined", () => {
    setup({ onRowSelect: undefined });
    fireEvent.click(screen.getByText("test1"));
    expect(mockOnRowSelect).toHaveBeenCalledTimes(0);
  });

  it("should allow to onRowDelete to be undefined", () => {
    setup({ onRowDelete: undefined });
    fireEvent.click(screen.getAllByTestId("delete-button")[0]);
    expect(mockORowDelete).toHaveBeenCalledTimes(0);
  });

  it("should allow to canSelectRow to be undefined", () => {
    setup({ canSelectRow: undefined });
    fireEvent.click(screen.getByText("test1"));
    expect(mockCanSelectRow).toHaveBeenCalledTimes(0);
  });

  it("should change sort order when clicking on header", () => {
    setup();
    fireEvent.click(screen.getByText("ID"));
    expect(screen.getByTestId("table-header-id")).toHaveStyleRule(
      "color",
      "#2F2F2F"
    );
  });

  it("should change sort order when clicking on header with defaultSorting", () => {
    setup({ defaultSorting: { field: "id", order: "ascend" } });
    fireEvent.click(screen.getByText("ID"));
    expect(screen.getByTestId("table-header-id")).toHaveStyleRule(
      "color",
      "#2F2F2F"
    );
  });

  it('should render custom column with "render" prop', () => {
    setup({
      columns: [
        {
          field: "id",
          title: "ID",
          width: "100px",
          render: (value) => <span>{value.id + "-custom"}</span>,
        },
      ],
    });
    expect(screen.getByText("test1-custom")).toBeInTheDocument();
  });
});

describe("SpanRed", () => {
  it("should render correctly", () => {
    const { container } = render(<SpanRed />);
    expect(container).toMatchSnapshot();
  });
});

describe("SpanGreen", () => {
  it("should render correctly", () => {
    const { container } = render(<SpanGreen />);
    expect(container).toMatchSnapshot();
  });
});

describe("SortingArrow", () => {
  it("should render correctly", () => {
    const { container } = render(<SortingArrow order="descend" />);
    expect(container).toMatchSnapshot();
  });

  it("should render correctly when order is ascend", () => {
    const { container } = render(<SortingArrow order="ascend" />);
    expect(container).toMatchSnapshot();
  });
});
