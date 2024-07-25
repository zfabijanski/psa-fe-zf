import { ModalInfoIcon, IModalInfoIconProps } from "./ModalInfoIcon";
import { render, screen, fireEvent } from "testUtils";

const setup = (props: IModalInfoIconProps) =>
  render(<ModalInfoIcon {...props} />);

describe("ModalInfoIcon", () => {
  it("should render the component", () => {
    setup({ modalContentTrKey: "modalContentTrKey" });
    expect(screen.getByText("info.svg")).toBeInTheDocument();
  });

  it("should open modal when clicked", () => {
    setup({ modalContentTrKey: "modalContentTrKey" });
    fireEvent.click(screen.getByText("info.svg"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
