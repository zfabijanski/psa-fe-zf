import { CurrencyInput, ICurrencyInputProps } from "./CurrencyInput";
import { render, screen, fireEvent } from "testUtils";

const mockOnChange = jest.fn();
const defaultProps: ICurrencyInputProps = {
  value: "",
  onChange: mockOnChange,
};

const setup = (props: Partial<ICurrencyInputProps> = {}) =>
  render(
    <CurrencyInput data-testid="currency-input" {...defaultProps} {...props} />
  );

describe("CurrencyInput", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the value with fractional digits", () => {
    setup({ value: "12345", fractional: true });
    expect(screen.getByDisplayValue("12 345,00 zł")).toBeInTheDocument();
  });

  it("should render the value without fractional digits", () => {
    setup({ value: "12345", fractional: false });
    expect(screen.getByDisplayValue("12 345 zł")).toBeInTheDocument();
  });

  it("should call onChange when changed", () => {
    setup();
    fireEvent.change(screen.getByTestId("currency-input"), {
      target: { value: "9987" },
    });
    expect(mockOnChange).toHaveBeenCalledWith("9987");
  });

  it("should not format the value when the value is empty", () => {
    setup({ value: "" });
    expect(screen.getByDisplayValue("")).toBeInTheDocument();
  });
});
