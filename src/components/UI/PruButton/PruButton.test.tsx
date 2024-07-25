import { PruButton, IButtonProps, PruButtonType } from "./PruButton";
import { render, screen, fireEvent } from "testUtils";

const mockOnClick = jest.fn();

const defaultProps: Partial<IButtonProps> = {
  onClick: mockOnClick,
};

const setup = (props: Partial<IButtonProps> = {}) =>
  render(<PruButton {...defaultProps} {...props} />);

describe("PruButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it("should call onClick when button is clicked", () => {
    setup();
    fireEvent.click(screen.getByRole("button"));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("should handle different variants", () => {
    setup({ buttonType: "primary" });
    expect(screen.getByRole("button")).toHaveStyle(
      "background-color: rgb(5, 90, 96)"
    );
  });

  it("should render the text", () => {
    setup({ children: "text" });
    expect(screen.getByText("text")).toBeInTheDocument();
  });

  it.each(["primary", "primaryBlack", "secondary", "error"] as PruButtonType[])(
    `should render the %s button`,
    (buttonType: PruButtonType) => {
      setup({ buttonType });
      expect(screen.getByRole("button")).toMatchSnapshot();
    }
  );
});
