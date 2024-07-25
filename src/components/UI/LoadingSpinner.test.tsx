import { LoadingSpinner } from "./LoadingSpinner";
import { render } from "testUtils";

describe("LoadingSpinner", () => {
  it("should render the component", () => {
    const { container } = render(<LoadingSpinner />);
    expect(container).toMatchSnapshot();
  });
});
