import { PageElementWrapper } from "./PageElementWrapper";
import { render } from "testUtils";

describe("PageElementWrapper", () => {
  it("should render the component", () => {
    const { container } = render(<PageElementWrapper />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
