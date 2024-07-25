import { PruLabel } from "./PruLabel";
import { render } from "testUtils";

describe("PruLabel", () => {
  it("should render the component", () => {
    const { container } = render(<PruLabel />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
