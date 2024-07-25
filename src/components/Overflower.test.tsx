import { Overflower, IOverflowerProps } from "./Overflower";
import { render, screen } from "testUtils";

const defaultProps: IOverflowerProps = {
  shortText: "short text",
  longText: "long text",
};

const setup = (props: Partial<IOverflowerProps> = {}) =>
  render(<Overflower {...defaultProps} {...props} />);

describe("Overflower", () => {
  it("should render correctly", () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it("should render the short text", () => {
    setup();
    expect(screen.getByText("short text")).toBeInTheDocument();
  });

  it("should render the long text when the short text is clicked", () => {
    setup();
    screen.getByText("short text").click();
    expect(screen.getByText("long text")).toBeInTheDocument();
  });

  it("should render the short text when the long text is clicked", () => {
    setup();
    screen.getByText("short text").click();
    screen.getByText("long text").click();
    expect(screen.getByText("short text")).toBeInTheDocument();
  });

  it("should format shortText to string", () => {
    setup({ shortText: { id: "test" } });
    expect(screen.getByText("test")).toBeInTheDocument();
  });
});
