import { PruCheckbox, ECheckboxType, ICheckboxProps } from "./PruCheckbox";
import { render, screen } from "testUtils";

const mockOnChange = jest.fn();

const defaultProps: ICheckboxProps = {
  onChange: mockOnChange,
};

const setup = (props: Partial<ICheckboxProps> = {}) =>
  render(<PruCheckbox {...defaultProps} {...props} />);

describe("PruCheckbox", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it("should call onChange when checkbox is clicked", () => {
    setup();
    screen.getByRole("checkbox").click();
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it("should handle different types", () => {
    setup({ checkboxType: "regular" });
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("should render the label", () => {
    setup({ labelProps: { labelText: "label" } });
    expect(screen.getByText("label")).toBeInTheDocument();
  });

  it.each([
    "regular",
    "gridItem",
    "calcTableItem",
    "checkboxList",
  ] as ECheckboxType[])(
    `should render the %s checkbox`,
    (checkboxType: ECheckboxType) => {
      setup({ checkboxType });
      expect(screen.getByRole("checkbox")).toMatchSnapshot();
    }
  );

  it("should handle i18n in label", () => {
    setup({ labelProps: { labelTrKey: "label-translation-key" } });
    expect(screen.getByText("label-translation-key")).toBeInTheDocument();
  });

  it("should handle invalid case", () => {
    setup({ isInvalid: true });
    expect(screen.getByRole("checkbox")).toHaveStyle("border-color: #d13c15");
  });

  it("should handle disabled case", () => {
    setup({ disabled: true });
    expect(screen.getByRole("checkbox")).toHaveStyle("border-color: #999999");
  });
});
