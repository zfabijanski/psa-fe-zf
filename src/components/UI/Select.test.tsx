import { render, screen } from "testUtils";
import { Select, BaseSelectProps } from "./Select";

const mockOnChange = jest.fn();

const setup = (props: Partial<BaseSelectProps<any>> = {}) =>
  render(
    <Select
      value="test"
      labelProps={{ labelTrKey: "select label" }}
      options={[
        { value: "test", text: "test label" },
        { value: "test2", text: "test label2" },
      ]}
      onChange={mockOnChange}
      {...props}
    />
  );

describe("Select", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the label text", () => {
    setup();
    expect(screen.getByText("test label")).toBeInTheDocument();
  });

  it("renders the label when the value type is mixed", () => {
    setup({ value: "123", options: [{ value: 123, text: "test label" }] });
    expect(screen.getByText("test label")).toBeInTheDocument();
  });

  it("renders the validation error message", () => {
    setup({
      isInvalid: true,
      labelProps: { labelTrKey: "validation.invalid" },
    });
    expect(screen.getByText("validation.invalid")).toBeInTheDocument();
  });

  it("renders the correct chevron icon", () => {
    setup();
    expect(screen.getByText("chevron-down.svg")).toBeInTheDocument();
  });
});
