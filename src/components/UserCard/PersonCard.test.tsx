import { PersonCard } from "./PersonCard";
import { render, screen } from "testUtils";

jest.mock("slices/auth", () => ({
  ...jest.requireActual("slices/auth"),
  useGetAgentQuery: () => ({
    data: {
      picturePath: "100",
      pictureApiPath: "https://via.placeholder.com/100",
      position: "Consultant",
      fullName: "John Doe",
    },
  }),
}));

const setup = () => render(<PersonCard />);

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
    jest.spyOn(require("slices/auth"), "useGetAgentQuery").mockReturnValue({
      data: {
        picturePath: "",
        pictureApiPath: "",
        position: "title",
        fullName: "John Doe",
      },
    });

    setup();
    expect(
      screen.getByAltText("profile-avatar-placeholder")
    ).toBeInTheDocument();
  });
});
