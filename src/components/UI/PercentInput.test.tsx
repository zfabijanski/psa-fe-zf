import { PercentInput } from "./PercentInput";
import { render, screen } from "testUtils";

const setup = () => render(<PercentInput value="123" onChange={jest.fn()} />);

describe("PercentInput", () => {
  it("should render the component", () => {
    setup();
    expect(screen.getByDisplayValue("123%")).toBeInTheDocument();
  });
});
