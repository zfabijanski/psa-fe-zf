import { Footer, IFooterProps } from "./Footer";
import { render, screen } from "testUtils";

const setup = (props: Partial<IFooterProps> = {}) =>
  render(<Footer {...props} />);

describe("Footer", () => {
  it("should render", () => {
    setup();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("should render footer blocker", () => {
    setup({ footerBlockerVisible: true });
    expect(screen.getByTestId("footer-blocker")).toBeInTheDocument();
  });

  it("should render left section", () => {
    setup({ leftSection: <div>Left section</div> });
    expect(screen.getByText("Left section")).toBeInTheDocument();
  });

  it("should render center section", () => {
    setup({ centerSection: <div>Center section</div> });
    expect(screen.getByText("Center section")).toBeInTheDocument();
  });

  it('should render "transparent" footer', () => {
    setup({ transparent: true });
    expect(screen.getByTestId("footer-wrapper")).toHaveStyle(
      "background-color: transparent"
    );
  });

  it("should render right section", () => {
    setup({ rightSection: <div>Right section</div> });
    expect(screen.getByText("Right section")).toBeInTheDocument();
  });

  it("should call onFooterBlockerClick when footer blocker is clicked", () => {
    const onFooterBlockerClick = jest.fn();
    setup({ footerBlockerVisible: true, onFooterBlockerClick });
    screen.getByTestId("footer-blocker").click();
    expect(onFooterBlockerClick).toHaveBeenCalled();
  });

  it("should not call onFooterBlockerClick when footer blocker is clicked and onFooterBlockerClick is not provided", () => {
    const onFooterBlockerClick = jest.fn();
    setup({ footerBlockerVisible: true });
    screen.getByTestId("footer-blocker").click();
    expect(onFooterBlockerClick).not.toHaveBeenCalled();
  });
});
