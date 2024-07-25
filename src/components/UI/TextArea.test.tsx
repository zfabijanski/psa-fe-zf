import { TextArea, ITextAreaProps } from "./TextArea";
import { render, screen, fireEvent } from "testUtils";

const mockOnChange = jest.fn();

const defaultProps: ITextAreaProps = {
  value: "",
  onChange: mockOnChange,
};

const setup = (props: Partial<ITextAreaProps> = {}) =>
  render(<TextArea data-testid="test-textarea" {...defaultProps} {...props} />);

describe("TextArea", () => {
  it("should render the component", () => {
    setup();
    expect(screen.getByTestId("test-textarea")).toBeInTheDocument();
  });

  it("should render the component with placeholder", () => {
    const placeholder = "test placeholder";
    setup({ placeholder });
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  it("should render the component with label", () => {
    setup({ labelProps: { labelText: "test label" } });
    expect(screen.getByText("test label")).toBeInTheDocument();
  });

  it("should render the component with error", () => {
    setup({
      labelProps: { validationInfoTrKeys: [{ trKey: "test message" }] },
    });
    expect(screen.getByText("test message")).toBeInTheDocument();
  });

  it("should  handle onBlur event", () => {
    const mockOnBlur = jest.fn();
    setup({ onBlur: mockOnBlur });
    fireEvent.blur(screen.getByTestId("test-textarea"));
    expect(mockOnBlur).toHaveBeenCalled();
  });
});
