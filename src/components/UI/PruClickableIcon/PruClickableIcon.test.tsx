import { IPruClickableIconProps, PruClickableIcon } from "./PruClickableIcon";
import { render } from "testUtils";

const setup = (props: Partial<IPruClickableIconProps> = {}) =>
  render(<PruClickableIcon type="air-plane" {...props} />);

describe("PruClickableIcon", () => {
  it("should render correctly", () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it("should render correctly when disabled", () => {
    const { container } = setup({ disabled: true });
    expect(container).toMatchSnapshot();
  });
});
