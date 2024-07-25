import { INumericInputProps, NumericInput } from "./NumericInput";
import { render, screen, fireEvent } from "testUtils";

const mockGetFormattedValue = jest.fn();
const mockOnChange = jest.fn();

const defaultProps: INumericInputProps = {
  getFormattedValue: mockGetFormattedValue,
  onChange: mockOnChange,
  value: "123",
};

const setup = (props: Partial<INumericInputProps> = {}) =>
  render(
    <NumericInput data-testid="numeric-input" {...defaultProps} {...props} />
  );

describe("NumericInput", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the component", () => {
    setup();
    expect(screen.getByTestId("numeric-input")).toBeInTheDocument();
  });

  it("shouldn't format value when focused", () => {
    setup({
      getFormattedValue: (value) => value.split("+").join(""),
    });
    fireEvent.focus(screen.getByTestId("numeric-input"));
    expect(screen.getByTestId("numeric-input")).toHaveValue("123");
  });

  it("should call onFocus when input is focused", () => {
    const mockOnFocus = jest.fn();
    setup({
      onFocus: mockOnFocus,
    });
    fireEvent.focus(screen.getByTestId("numeric-input"));
    expect(mockOnFocus).toHaveBeenCalled();
  });

  it("should call onBlur when input is blurred", () => {
    const mockOnBlur = jest.fn();
    setup({
      onBlur: mockOnBlur,
    });
    fireEvent.blur(screen.getByTestId("numeric-input"));
    expect(mockOnBlur).toHaveBeenCalled();
  });
});
