import { Form, IFormProps } from "./Form";
import { render, screen, fireEvent } from "testUtils";

const mockOnSubmit = jest.fn();

const defaultProps: IFormProps = {
  onSubmit: mockOnSubmit,
};

const setup = (props: Partial<IFormProps> = {}) =>
  render(<Form {...defaultProps} {...props} />);

describe("Form", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it("should call onSubmit when form is submitted", () => {
    setup();
    fireEvent.submit(screen.getByRole("form"));
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });
});
