import { Box, BoxProps } from "./Box";
import { render } from "testUtils";

const setup = (props: Partial<BoxProps> = {}) => render(<Box {...props} />);

describe("Box", () => {
  it("should match snapshot", () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it("should handle functional css prop", () => {
    const { container } = setup({ css: () => ({ color: "red" }) });
    expect(container).toMatchSnapshot();
  });
});
