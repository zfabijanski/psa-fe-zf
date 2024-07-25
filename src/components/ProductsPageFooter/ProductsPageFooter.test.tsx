import {
  IProductPageFooterProps,
  ProductsPageFooter,
} from "./ProductsPageFooter";
import { render, screen, fireEvent, sleep } from "testUtils";
import * as router from "utils/router";

const mockOnPrevButtonClick = jest.fn();
const mockOpenConfirmModal = jest.fn();
const mockOnEAppButtonClick = jest.fn();
const mockOnFooterBlockerClick = jest.fn();

const defaultProps: IProductPageFooterProps = {
  isNeedsAnalysisDone: false,
  prevButtonVisible: false,
  onPrevButtonClick: mockOnPrevButtonClick,
  onOpenConfirmModal: mockOpenConfirmModal,
  haveIdd: false,
  onEAppButtonClick: mockOnEAppButtonClick,
  footerBlockerVisible: false,
  onFooterBlockerClick: mockOnFooterBlockerClick,
};

const setup = (props: Partial<IProductPageFooterProps> = {}) =>
  render(<ProductsPageFooter {...defaultProps} {...props} />);

describe("ProductsPageFooter", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it("should show apk title when isNeedsAnalysisDone is true", () => {
    setup({ isNeedsAnalysisDone: true });
    expect(screen.getByText("apk.title")).toBeInTheDocument();
  });

  it("should show back button when prevButtonVisible is true", () => {
    setup({ prevButtonVisible: true });
    expect(screen.getByText("bottomButtonBar.back")).toBeInTheDocument();
  });

  it("should call onPrevButtonClick when prev button is clicked", () => {
    setup({ prevButtonVisible: true });
    fireEvent.click(screen.getByText("bottomButtonBar.back"));
    expect(mockOnPrevButtonClick).toHaveBeenCalledTimes(1);
  });

  it("should navigate to the correct page when idd button is clicked", () => {
    setup({ haveIdd: false });
    fireEvent.click(screen.getByText("idd.title"));
    expect(window.location.pathname).toBe("/adequacy-idd");
  });

  it("should navigate to the correct page when haveIdd is true", () => {
    setup({ haveIdd: true });
    fireEvent.click(screen.getByText("idd.title"));
    expect(window.location.pathname).toBe("/report-idd");
  });

  it("should call onOpenConfirmModal when library button is clicked", () => {
    setup();
    fireEvent.click(screen.getByText("bottomButtonBar.library"));
    expect(mockOpenConfirmModal).toHaveBeenCalledTimes(1);
  });

  it("should call onEAppButtonClick when eApp button is clicked", () => {
    setup();
    fireEvent.click(screen.getByText("bottomButtonBar.application"));
    expect(mockOnEAppButtonClick).toHaveBeenCalledTimes(1);
  });

  it("should call onFooterBlockerClick when footer blocker is clicked", () => {
    setup({ footerBlockerVisible: true });
    fireEvent.click(screen.getByTestId("footer-blocker"));
    expect(mockOnFooterBlockerClick).toHaveBeenCalledTimes(1);
  });

  it("should hide prev button when prevButtonVisible is false", () => {
    setup({ prevButtonVisible: false });
    expect(screen.queryByText("bottomButtonBar.back")).not.toBeInTheDocument();
  });

  it("should show prev button when prevButtonVisible is undefined", () => {
    setup({ prevButtonVisible: undefined });
    expect(screen.getByText("bottomButtonBar.back")).toBeInTheDocument();
  });

  it("should handle onPrevButtonClick being undefined", () => {
    setup({ onPrevButtonClick: undefined, prevButtonVisible: undefined });
    fireEvent.click(screen.getByText("bottomButtonBar.back"));
    expect(mockOnPrevButtonClick).toHaveBeenCalledTimes(0);
  });

  it("should handle onEAppButtonClick being undefined", () => {
    setup({ onEAppButtonClick: undefined });
    fireEvent.click(screen.getByText("bottomButtonBar.application"));
    expect(mockOnEAppButtonClick).toHaveBeenCalledTimes(0);
  });

  it("should handle haveIdd being undefined", () => {
    setup({ haveIdd: undefined });
    fireEvent.click(screen.getByText("idd.title"));
    expect(window.location.pathname).toBe("/adequacy-idd");
  });

  it("should open the modal when the library button is clicked", () => {
    setup();
    fireEvent.click(screen.getByText("bottomButtonBar.library"));
    expect(screen.getByText("bottomButtonBar.library")).toBeInTheDocument();
  });

  it("should call redirect with the correct url when the library button is clicked", async () => {
    const mockRedirect = jest.fn();
    jest.spyOn(router, "redirect").mockImplementation(mockRedirect);
    setup({ onOpenConfirmModal: undefined });
    fireEvent.click(screen.getByText("bottomButtonBar.library"));
    await sleep();
    expect(mockRedirect).toHaveBeenCalledWith("/library");
  });

  it("calls onEAppButtonClick when the eApp button is clicked", () => {
    setup();
    fireEvent.click(screen.getByText("bottomButtonBar.application"));
    expect(mockOnEAppButtonClick).toHaveBeenCalledTimes(1);
  });
});
