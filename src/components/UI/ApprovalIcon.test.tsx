import { ApprovalIcon, IApprovalIconProps } from "./ApprovalIcon";
import { render } from "testUtils";

const setup = (props: Partial<IApprovalIconProps> = {}) =>
  render(<ApprovalIcon {...props} />);

describe("ApprovalIcon", () => {
  it("should match snapshot", () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
});
