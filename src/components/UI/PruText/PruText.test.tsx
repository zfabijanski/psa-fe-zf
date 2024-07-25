import { PruText, IPruTextProps } from "./PruText";
import { render, screen } from "testUtils";

const setup = (props: Partial<IPruTextProps> = {}) =>
  render(<PruText {...props}>Pru Text</PruText>);

describe("PruText", () => {
  it("should render correctly", () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it("should handle custom font size", () => {
    setup({ fontSize: 20 });
    expect(screen.getByText("Pru Text")).toHaveStyleRule("font-size", "20px");
  });

  it("should handle custom font weight", () => {
    setup({ fontWeight: "700" });
    expect(screen.getByText("Pru Text")).toHaveStyleRule("font-weight", "700");
  });

  it("should handle custom line height", () => {
    setup({ lineHeight: 30 });
    expect(screen.getByText("Pru Text")).toHaveStyleRule("line-height", "30px");
  });
});
