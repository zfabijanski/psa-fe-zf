import { Header, IHeaderProps } from "./Header";
import { render, screen } from "testUtils";

const setup = (props: Partial<IHeaderProps> = {}) =>
  render(<Header {...props} />);

describe("Header", () => {
  it("should render", () => {
    setup();
    expect(screen.getByRole("header")).toBeInTheDocument();
  });

  it("should render home icon", () => {
    setup({ navigationHidden: false });
    expect(screen.getByTestId("home-icon")).toBeInTheDocument();
  });

  it("should render page name", () => {
    setup({ pageName: "Page name" });
    expect(screen.getByText("Page name")).toBeInTheDocument();
  });

  it("should render client name", () => {
    setup({ clientName: "Client name" });
    expect(screen.getByText("Client name")).toBeInTheDocument();
  });
});
