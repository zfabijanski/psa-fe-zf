import { ErrorMessage } from "./ErrorMessage";
import { render, screen } from "testUtils";

const setup = () => render(<ErrorMessage message="test-message" />);

describe("ErrorMessage", () => {
  it("should render message in a modal", () => {
    setup();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("test-message")).toBeInTheDocument();
  });
});
