import { TextTransformationCode } from "../Survey.types";
import SurveyTextArea, { SurveyTextAreaProps } from "./SurveyTextArea";
import { render, screen, fireEvent } from "testUtils";

const mockOnChange = jest.fn();
const defaultProps: SurveyTextAreaProps = {
  transformationCode: TextTransformationCode.TTSE1,
  onChange: mockOnChange,
  value: "",
};

const setup = (props: Partial<SurveyTextAreaProps> = {}) =>
  render(<SurveyTextArea {...defaultProps} {...props} />);

describe("SurveyTextArea", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render", () => {
    setup();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("should call onChange", () => {
    setup();
    const textarea = screen.getByRole("textbox");
    const text = "test";
    textarea.focus();
    fireEvent.change(textarea, { target: { value: text } });
    expect(mockOnChange).toBeCalledWith(text);
  });

  it("should handle disabled state", () => {
    setup({ disabled: true });
    const textarea = screen.getByRole("textbox");
    expect(textarea).toBeDisabled();
  });

  it("should handle isApproved state", () => {
    setup({ isApproved: true });
    expect(
      screen.getByAltText("check-white-green-rounded")
    ).toBeInTheDocument();
  });

  it("should handle isInvalid state", async () => {
    setup({
      isInvalid: true,
      labelProps: {
        validationInfoTrKeys: [{ trKey: "error message" }],
      },
    });
    const textarea = screen.getByRole("textbox");

    expect(screen.queryByText("error message")).not.toBeInTheDocument();

    fireEvent.blur(textarea);

    expect(await screen.findByText("error message")).toBeInTheDocument();
    expect(mockOnChange).toBeCalledWith("");
  });
});
