import { Loader } from "./Loader";
import { render } from "testUtils";

describe("Loader", () => {
  it("should render correctly", () => {
    const { container } = render(<Loader />);
    expect(container).toMatchSnapshot();
  });
});
