import { IConfirmModalOptions, Variant } from "slices/confirmModal";
import { ConfirmModal } from "./ConfirmModal";
import { render, screen } from "testUtils";

const mockOnConfirm = jest.fn();
const mockOnCancel = jest.fn();

const defaultProps: IConfirmModalOptions = {
  confirmText: "Confirm",
  onConfirm: mockOnConfirm,
  onCancel: mockOnCancel,
};

const setup = (props: Partial<IConfirmModalOptions> = {}) =>
  render(<ConfirmModal {...defaultProps} {...props} />);

describe("ConfirmModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it("should call onConfirm when confirm button is clicked", () => {
    setup();
    screen.getByText("Confirm").click();
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  it("should call onCancel when cancel button is clicked", () => {
    setup({ showCancel: true });
    screen.getByText("confirmWindow.back").click();
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it("should handle different variants", () => {
    setup({ variant: Variant.Deny });
    expect(screen.getByText("Confirm")).toHaveStyle(
      "background-color: rgb(5, 90, 96)"
    );
  });

  it("should render the header", () => {
    setup({ header: "header" });
    expect(screen.getByText("header")).toBeInTheDocument();
  });

  it("should render the message", () => {
    setup({ message: "message" });
    expect(screen.getByText("message")).toBeInTheDocument();
  });

  it("should render the formatted text", () => {
    setup({ formattedText: "<p>formatted text</p>" });
    expect(screen.getByText("formatted text")).toBeInTheDocument();
  });

  it("should change icon when showBackdrop is false", () => {
    setup({ showCancel: true, showBackdrop: false });
    expect(screen.getByText("confirmWindow.back")).toMatchSnapshot();
  });
});
