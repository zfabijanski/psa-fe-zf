import { PersonCard, IPersonCard } from "./PersonCard";
import { render, screen } from "testUtils";

const defaultProps: IPersonCard = {
  fullName: "John Doe",
  image: "https://via.placeholder.com/100",
  title: "Consultant",
};

const setup = (props: Partial<IPersonCard> = {}) =>
  render(<PersonCard {...defaultProps} {...props} />);

describe("PersonCard", () => {
  it("should render correctly", () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it("should render the correct name", () => {
    setup();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("should render the correct title", () => {
    setup();
    expect(screen.getByText("Consultant")).toBeInTheDocument();
  });

  it("should render the correct image", () => {
    setup();
    expect(screen.getByAltText("profile-avatar")).toBeInTheDocument();
  });

  it("should render the correct image when image is not provided", () => {
    setup({ image: undefined });
    expect(
      screen.getByAltText("profile-avatar-placeholder")
    ).toBeInTheDocument();
  });
});
