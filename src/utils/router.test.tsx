import {
  redirect,
  goBack,
  withRedirect,
  withPointer,
  withLink,
  browserHistory,
  memoryHistory,
} from "./router";
import { render, screen, fireEvent } from "testUtils";

describe("redirect", () => {
  it("should redirect to the given path and change browser history", () => {
    const mockReplace = jest.fn();
    jest.spyOn(browserHistory, "replace").mockImplementation(mockReplace);

    redirect("/mail", true, { test: "test" });

    expect(mockReplace).toHaveBeenCalledWith("/mail", {
      fromApp: true,
      test: "test",
    });
  });

  it("should redirect to the given path and change memory history", () => {
    const mockPush = jest.fn();
    jest.spyOn(memoryHistory, "push").mockImplementation(mockPush);

    redirect("/mail", false, { test: "test" });

    expect(mockPush).toHaveBeenCalledWith("/mail", {
      fromApp: true,
      test: "test",
    });
  });

  it("should call memory goBack method", () => {
    const mockGoBack = jest.fn();
    jest.spyOn(memoryHistory, "goBack").mockImplementation(mockGoBack);

    goBack();

    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });

  it("should inject redirect method to the component", () => {
    const mockPush = jest.fn();
    jest.spyOn(memoryHistory, "push").mockImplementation(mockPush);

    const Component = withRedirect(
      ({ onClick }) => <button onClick={onClick}>button</button>,
      "/mail"
    );
    render(<Component />);

    fireEvent.click(screen.getByText("button"));

    expect(mockPush).toHaveBeenCalledWith("/mail", {
      fromApp: true,
    });
  });

  it("should inject redirect method to the component and handle its custom onClick", () => {
    const mockPush = jest.fn();
    const customOnClick = jest.fn();
    jest.spyOn(memoryHistory, "push").mockImplementation(mockPush);

    const Component = withRedirect(
      ({ onClick }) => <button onClick={onClick}>button</button>,
      "/mail"
    );
    render(<Component onClick={customOnClick} />);

    fireEvent.click(screen.getByText("button"));

    expect(mockPush).toHaveBeenCalledWith("/mail", {
      fromApp: true,
    });
  });

  it("should add cursor pointer to the component", () => {
    const Component = withPointer((props) => (
      <button {...props}>button</button>
    ));
    render(<Component />);

    expect(screen.getByText("button")).toHaveStyleRule("cursor: pointer");
  });

  it("should handle withLink hoc", () => {
    const Component = withLink(
      (props) => <button {...props}>button</button>,
      "/mail"
    );
    render(<Component />);

    fireEvent.click(screen.getByText("button"));
    expect(screen.getByText("button")).toHaveStyleRule("cursor: pointer");
  });
});
