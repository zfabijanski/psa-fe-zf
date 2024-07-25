import { Bold } from "./Bold";
import { render } from "testUtils";

const setup = () => render(<Bold />);

describe("Bold", () => {
  it("should match snapshot", () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
});
