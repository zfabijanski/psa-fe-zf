import { Backdrop } from "./Backdrop";
import { render } from "testUtils";

const setup = () => render(<Backdrop />);

describe("Backdrop", () => {
  it("should match snapshot", () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
});
