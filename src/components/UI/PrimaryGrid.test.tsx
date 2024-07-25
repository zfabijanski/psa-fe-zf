import { PrimaryGrid } from "./PrimaryGrid";
import { render } from "testUtils";

describe("PrimaryGrid", () => {
  it("should render the component", () => {
    const { container } = render(<PrimaryGrid />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
