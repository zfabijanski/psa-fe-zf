import { RadioList, IRadioListProps } from "./RadioList";
import { render, screen, fireEvent } from "testUtils";

const mockOnChange = jest.fn();
const defaultProps: IRadioListProps = {
  onChange: mockOnChange,
  labelProps: {
    labelTrKey: "label",
  },
  options: [
    { labelTrKey: "radio1", value: "radio1" },
    { labelTrKey: "radio2", value: "radio2" },
  ],
};

const setup = (props: Partial<IRadioListProps> = {}) =>
  render(<RadioList {...defaultProps} {...props} />);

describe("RadioList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the component", () => {
    setup();
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
  });

  it("should call onChange when radio is clicked", () => {
    setup();
    fireEvent.click(screen.getByText("radio1"));
    expect(mockOnChange).toHaveBeenCalled();
  });

  it("should handle disabled state", () => {
    setup({ disabled: true });
    fireEvent.click(screen.getByText("radio1"));
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it("should handle additional value", () => {
    setup({
      options: [
        {
          labelTrKey: "radio1",
          value: "radio1",
          inputLabelProps: { labelText: "additional-input" },
          hasAdditionalValue: true,
        },
      ],
    });
    expect(screen.getByLabelText("additional-input")).toBeInTheDocument();
  });
});
