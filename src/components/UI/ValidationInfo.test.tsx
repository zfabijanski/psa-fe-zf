import { ValidationInfo } from "./ValidationInfo";
import { render, screen } from "testUtils";

const setup = (props = {}) =>
  render(
    <ValidationInfo validations={[{ trKey: "test-message" }]} {...props} />
  );

describe("ValidationInfo", () => {
  it("should render the component", () => {
    setup();
    expect(screen.getByText("test-message")).toBeInTheDocument();
  });

  it("should render the component with icon", () => {
    setup({ withIcon: true });
    expect(screen.getByText("alert-fill.svg")).toBeInTheDocument();
  });

  it("should render the component with custom text color", () => {
    setup({ textColor: "primary" });
    expect(screen.getByText("test-message")).toMatchSnapshot();
  });
});
