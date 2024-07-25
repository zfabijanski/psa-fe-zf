import {
  ScrollableContainer,
  IScrollableContainerProps,
} from "./ScrollableContainer";
import { render } from "testUtils";

const setup = (props: Partial<IScrollableContainerProps> = {}) =>
  render(<ScrollableContainer {...props} />);

describe("ScrollableContainer", () => {
  it("should match snapshot", () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
});
