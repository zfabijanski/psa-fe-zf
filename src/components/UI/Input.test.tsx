import { Input, IInputProps, getTextFromMixed } from "./Input";
import { render, screen, fireEvent, sleep } from "testUtils";

const mockOnChange = jest.fn();
const defaultProps: IInputProps = {
  value: "",
  onChange: mockOnChange,
};

const setup = (props: Partial<IInputProps> = {}) =>
  render(<Input data-testid="input" {...defaultProps} {...props} />);

describe("Input", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the value", () => {
    setup({ value: "12345" });
    expect(screen.getByDisplayValue("12345")).toBeInTheDocument();
  });

  it("should call onChange when changed", () => {
    setup();
    fireEvent.change(screen.getByTestId("input"), {
      target: { value: "9987" },
    });
    expect(mockOnChange).toHaveBeenCalledWith("9987");
  });

  it("should not format the value when the value is empty", () => {
    setup({ value: "" });
    expect(screen.getByDisplayValue("")).toBeInTheDocument();
  });

  it("should format the value when fixedPlaceholderConfig is defined", () => {
    setup({
      value: "12345678",
      fixedPlaceholderConfig: {
        fixedPlaceholder: "xx xx xx xx",
        maskPattern: "xx xx xx xx",
      },
    });
    expect(screen.getByDisplayValue("12 34 56 78")).toBeInTheDocument();
  });

  it("should handle empty value when fixedPlaceholderConfig is defined", () => {
    setup({
      value: undefined,
      fixedPlaceholderConfig: {
        fixedPlaceholder: "xx xx xx xx",
        maskPattern: "xx xx xx xx",
      },
    });
    expect(screen.getByDisplayValue("xx xx xx xx")).toBeInTheDocument();
  });

  it("should parse value on blur", () => {
    const mockOnBlur = jest.fn();

    setup({
      value: "12345678",
      onBlur: mockOnBlur,
      fixedPlaceholderConfig: {
        fixedPlaceholder: "xx xx xx xx",
        maskPattern: "xx xx xx xx",
      },
    });

    fireEvent.blur(screen.getByTestId("input"), {
      target: { value: "12 34 56" },
    });

    expect(mockOnBlur).toHaveBeenCalledWith("123456");
  });

  it("should handle selection when fixedPlaceholderConfig is defined", async () => {
    setup({
      value: "12345678",
      fixedPlaceholderConfig: {
        fixedPlaceholder: "xx xx xx xx",
        maskPattern: "xx xx xx xx",
      },
    });

    fireEvent.select(screen.getByTestId("input"));

    await sleep();

    expect(screen.getByTestId("input")).toHaveProperty("selectionStart", 11);
    expect(screen.getByTestId("input")).toHaveProperty("selectionEnd", 11);
  });

  it('should calculate selection when fixedPlaceholderConfig is defined and value is "12345678"', async () => {
    setup({
      value: "12345678",
      fixedPlaceholderConfig: {
        fixedPlaceholder: "xx xx xx xx",
        maskPattern: "xx xx xx xx",
      },
    });

    fireEvent.change(screen.getByTestId("input"), {
      target: { selectionStart: 3, selectionEnd: 3 },
    });
    fireEvent.change(screen.getByTestId("input"), {
      value: "12355545678",
    });

    await sleep();

    expect(screen.getByTestId("input")).toHaveProperty("selectionStart", 3);
    expect(screen.getByTestId("input")).toHaveProperty("selectionEnd", 3);
  });

  it("should render icon", () => {
    setup({
      iconName: "alert-fill",
      iconPosition: "right",
    });

    expect(screen.getByText("alert-fill.svg")).toBeInTheDocument();
  });

  it("should render filled description", () => {
    setup({
      value: "45",
      filledDesc: "filled test",
    });

    expect(screen.getByText("filled test")).toBeInTheDocument();
  });

  it("should disable pasting events", () => {
    setup({ disablePasting: true });

    fireEvent.paste(screen.getByTestId("input"), {
      clipboardData: {
        getData: () => "123",
      },
    });

    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it("should disable drag and drop events", () => {
    setup({ disablePasting: true });

    fireEvent.drop(screen.getByTestId("input"), {
      dataTransfer: {
        getData: () => "123",
      },
    });

    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it('should disable browser\'s autocomplete when autoComplete="off"', () => {
    setup({ autoComplete: "off" });
    expect(screen.getByTestId("input")).toHaveAttribute("autocomplete", "off");
  });
});

describe("getTextFromMixed", () => {
  it("should return the value when the value is a string", () => {
    expect(getTextFromMixed("test")).toBe("test");
  });

  it("should return value when mixed is a MessageDescriptor", () => {
    expect(getTextFromMixed({ id: "test" })).toBe("test");
  });
});
