import { AddSectionButton, IAddSectionButtonProps } from "./AddSectionButton";
import { render, screen } from "testUtils";

const mockOnClick = jest.fn();
const defaultProps: IAddSectionButtonProps = {
  textTrKey: "test",
  onClick: mockOnClick,
};

const setup = (props: Partial<IAddSectionButtonProps> = {}) =>
  render(<AddSectionButton {...defaultProps} {...props} />);

describe("AddSectionButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it("should render the textTrKey", () => {
    setup();
    expect(screen.getByText("test")).toBeInTheDocument();
  });

  it("should render the buttonText when provided", () => {
    setup({ buttonText: "buttonText" });
    expect(screen.getByText("buttonText")).toBeInTheDocument();
  });

  it("should render the buttonIconName when provided", () => {
    setup({ buttonIconName: "alert-double-triangle" });
    expect(screen.getByText("alert-double-triangle.svg")).toBeInTheDocument();
  });

  it("should call onClick when clicked", () => {
    setup();
    screen.getByText("test").click();
    expect(mockOnClick).toHaveBeenCalled();
  });
});
