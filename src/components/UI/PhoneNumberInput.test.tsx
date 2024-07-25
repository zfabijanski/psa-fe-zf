import { PhoneNumberInput } from "./PhoneNumberInput";
import { render, screen } from "testUtils";

const setup = () =>
  render(<PhoneNumberInput value="123999345" onChange={jest.fn()} />);

describe("PhoneNumberInput", () => {
  it("should render the component with correct mask", () => {
    setup();
    expect(screen.getByDisplayValue("123 999 345")).toBeInTheDocument();
  });
});
