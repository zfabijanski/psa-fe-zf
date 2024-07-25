import { PruSwitch, PruSwitchProps } from "./PruSwitch";
import { render, screen, fireEvent } from "testUtils";

const mockOnValueChange = jest.fn();

const defaultProps: PruSwitchProps = {
  onValueChange: mockOnValueChange,
};

const setup = (props: Partial<PruSwitchProps> = {}) =>
  render(<PruSwitch {...defaultProps} {...props} />);

describe("PruSwitch", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it("should call onValueChange when switch is clicked", () => {
    setup();
    fireEvent.click(screen.getByRole("checkbox"));
    expect(mockOnValueChange).toHaveBeenCalledTimes(1);
  });

  it("should call custom change handler when switch is clicked", () => {
    const mockCustomChangeHandler = jest.fn();
    setup({ onChange: mockCustomChangeHandler });
    fireEvent.click(screen.getByRole("checkbox"));
    expect(mockCustomChangeHandler).toHaveBeenCalledTimes(1);
    expect(mockOnValueChange).toHaveBeenCalledTimes(1);
  });

  it("should allow to onValueChange to be undefined", () => {
    setup({ onValueChange: undefined });
    fireEvent.click(screen.getByRole("checkbox"));
    expect(mockOnValueChange).toHaveBeenCalledTimes(0);
  });
});
