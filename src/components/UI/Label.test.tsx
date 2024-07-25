import { Label, ILabelProps } from "./Label";
import { render, screen } from "testUtils";

const setup = (props: ILabelProps) => render(<Label {...props} />);

describe("Label", () => {
  it("should render the label", () => {
    setup({ labelText: "label" });
    expect(screen.getByText("label")).toBeInTheDocument();
  });

  it("should render the label with text styles", () => {
    setup({ labelText: "label", labelTextStyles: { color: "red" } });
    expect(screen.getByText("label")).toHaveStyle("color: red");
  });

  it("should render label with translation key", () => {
    setup({ labelTrKey: "labelTrKey" });
    expect(screen.getByText("labelTrKey")).toBeInTheDocument();
  });

  it("should render modal info icon", () => {
    setup({ modalContentTrKey: "modalContentTrKey" });
    expect(screen.getByText("info.svg")).toBeInTheDocument();
  });

  it("should render modal info icon with html", () => {
    setup({ modalHtml: "modalHtml" });
    expect(screen.getByText("info.svg")).toBeInTheDocument();
  });

  it("should render inner icons", () => {
    const { container } = setup({ innerIcons: true });
    expect(container).toMatchSnapshot();
  });
});
