import { Icon, IIconProps, TIconType } from "./Icon";
import { render, screen } from "testUtils";

const setup = (props: Partial<IIconProps> = {}) =>
  render(<Icon name="check" {...props} data-testid="icon" />);

// prettier-ignore
const iconNames = ['alert-fill', 'alert-triangle', 'alert-double-triangle', 'illustration-frame-rounded', 'arrow-right', 'arrow-up', 'calculator', 'calculator-plus', 'calendar', 'check', 'corner-downn-left', 'chevron-down', 'chevron-down-2', 'chevron-down-3', 'chevron-left', 'chevron-right', 'chevron-up', 'file-text', 'info', 'logout', 'plus', 'refresh', 'search', 'trash-2', 'trash', 'user-plus', 'x', 'home', 'mail', 'mail-x', 'library', 'group', 'handshake', 'people', 'padlock', 'pru-logo', 'commission-system', 'electronic-application', 'products', 'old-check-white'] as const

describe("Icon", () => {
  it.each(iconNames)("renders %s icon", (iconName: TIconType) => {
    setup({ name: iconName });
    expect(screen.getByTestId("icon")).toMatchSnapshot();
  });

  it("handles onClick", () => {
    const onClick = jest.fn();
    setup({ name: "check", onClick });
    screen.getByTestId("icon").click();
    expect(onClick).toHaveBeenCalled();
  });

  it("handles different sizes", () => {
    setup({ width: 2137 });
    expect(screen.getByTestId("icon")).toMatchSnapshot();
  });

  it("accepts custom color", () => {
    setup({ color: "primary100" });
    expect(screen.getByTestId("icon")).toMatchSnapshot();
  });
});
