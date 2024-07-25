import { FC, SVGProps } from "react";
import styled from "styled-components/macro";
import { TDefaultThemeColor } from "../../theme/theme";

import { ReactComponent as AlertFill } from "../../assets/newIcons/alert-fill.svg";
import { ReactComponent as AlertTriangle } from "../../assets/newIcons/alert-triangle.svg";
import { ReactComponent as AlertDoubleTriangle } from "../../assets/newIcons/alert-double-triangle.svg";
import { ReactComponent as IllustrationFrameRounded } from "../../assets/newIcons/illustration-frame-rounded.svg";
import { ReactComponent as ArrowRight } from "../../assets/newIcons/arrow-right.svg";
import { ReactComponent as ArrowLeft } from "../../assets/newIcons/arrow-left.svg";
import { ReactComponent as ArrowUp } from "../../assets/newIcons/arrow-up.svg";
import { ReactComponent as Calculator } from "../../assets/newIcons/calculator.svg";
import { ReactComponent as CalculatorPlus } from "../../assets/newIcons/calculator-plus.svg";
import { ReactComponent as Calendar } from "../../assets/newIcons/calendar.svg";
import { ReactComponent as CornerDownLeft } from "../../assets/newIcons/corner-down-left.svg";
import { ReactComponent as Check } from "../../assets/newIcons/check.svg";
import { ReactComponent as ChevronDown } from "../../assets/newIcons/chevron-down.svg";
import { ReactComponent as ChevronDown2 } from "../../assets/newIcons/chevron-down-2.svg";
import { ReactComponent as ChevronDown3 } from "../../assets/newIcons/chevron-down-3.svg";
import { ReactComponent as ChevronLeft } from "../../assets/newIcons/chevron-left.svg";
import { ReactComponent as ChevronRight } from "../../assets/newIcons/chevron-right.svg";
import { ReactComponent as ChevronUp } from "../../assets/newIcons/chevron-up.svg";
import { ReactComponent as FileText } from "../../assets/newIcons/file-text.svg";
import { ReactComponent as Info } from "../../assets/newIcons/info.svg";
import { ReactComponent as Logout } from "../../assets/newIcons/logout.svg";
import { ReactComponent as Padlock } from "../../assets/newIcons/padlock.svg";
import { ReactComponent as Plus } from "../../assets/newIcons/plus.svg";
import { ReactComponent as Search } from "../../assets/newIcons/search.svg";
import { ReactComponent as Trash2 } from "../../assets/newIcons/trash-2.svg";
import { ReactComponent as Trash } from "../../assets/newIcons/trash.svg";
import { ReactComponent as Refresh } from "../../assets/newIcons/refresh.svg";
import { ReactComponent as UserPlus } from "../../assets/newIcons/user-plus.svg";
import { ReactComponent as X } from "../../assets/newIcons/x.svg";
import { ReactComponent as Home } from "../../assets/newIcons/home.svg";
import { ReactComponent as Mail } from "../../assets/newIcons/mail.svg";
import { ReactComponent as MailX } from "../../assets/newIcons/mail-x.svg";
import { ReactComponent as Library } from "../../assets/newIcons/library.svg";
import { ReactComponent as Group } from "../../assets/newIcons/group.svg";
import { ReactComponent as Handshake } from "../../assets/newIcons/handshake.svg";
import { ReactComponent as People } from "../../assets/newIcons/people.svg";
import { ReactComponent as PruLogo } from "../../assets/newIcons/logo.svg";
import { ReactComponent as CommissionSystem } from "../../assets/newIcons/commission-system.svg";
import { ReactComponent as ElectronicApplication } from "../../assets/newIcons/electronic-application.svg";
import { ReactComponent as Products } from "../../assets/newIcons/products.svg";

import { ReactComponent as OldCheckWhite } from "../../assets/icons/check-white.svg";

const mapping = {
  "alert-fill": <AlertFill />,
  "alert-triangle": <AlertTriangle />,
  "alert-double-triangle": <AlertDoubleTriangle />,
  "illustration-frame-rounded": <IllustrationFrameRounded />,
  "arrow-right": <ArrowRight />,
  "arrow-left": <ArrowLeft />,
  "arrow-up": <ArrowUp />,
  calculator: <Calculator />,
  "calculator-plus": <CalculatorPlus />,
  calendar: <Calendar />,
  check: <Check />,
  "corner-downn-left": <CornerDownLeft />,
  "chevron-down": <ChevronDown />,
  "chevron-down-2": <ChevronDown2 />,
  "chevron-down-3": <ChevronDown3 />,
  "chevron-left": <ChevronLeft />,
  "chevron-right": <ChevronRight />,
  "chevron-up": <ChevronUp />,
  "file-text": <FileText />,
  info: <Info />,
  logout: <Logout />,
  plus: <Plus />,
  refresh: <Refresh />,
  search: <Search />,
  "trash-2": <Trash2 />,
  trash: <Trash />,
  "user-plus": <UserPlus />,
  x: <X />,
  home: <Home />,
  mail: <Mail />,
  "mail-x": <MailX />,
  library: <Library />,
  group: <Group />,
  handshake: <Handshake />,
  people: <People />,
  padlock: <Padlock />,
  "pru-logo": <PruLogo />,
  "commission-system": <CommissionSystem />,
  "electronic-application": <ElectronicApplication />,
  products: <Products />,

  "old-check-white": <OldCheckWhite />,
};

export type TIconType = keyof typeof mapping;

export interface IIconProps extends Omit<SVGProps<SVGSVGElement>, "onClick"> {
  name: TIconType;
  width?: number;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  color?: TDefaultThemeColor;
  "data-testid"?: string;
}

export const Icon: FC<IIconProps> = (props): JSX.Element | null => {
  const { name, width, className, onClick, color } = props;
  // TODO: fix broken loading of icons
  // const { name, width, className, onClick, color, ref } = props;
  // const ImportedIconRef = useRef<FC<SVGProps<SVGSVGElement>>>();
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   let isComponentMounted = true;
  //   setLoading(true);

  //   (async (): Promise<void> => {
  //     try {
  //       const { default: namedImport } = await import(
  //         `!!@svgr/webpack?-svgo,+titleProp,+ref!../../assets/newIcons/${name}.svg`
  //       );
  //       ImportedIconRef.current = namedImport;
  //     } catch (err) {
  //       // throw err;
  //     } finally {
  //       isComponentMounted && setLoading(false);
  //     }
  //   })();

  //   return () => {
  //     isComponentMounted = false;
  //   };
  // }, [name]);

  // if (loading || !ImportedIconRef.current) return null;

  // const { current: ImportedIcon } = ImportedIconRef;

  return (
    <IconWrapper
      iconWidth={width}
      className={className}
      onClick={onClick}
      color={color}
      data-testid={props["data-testid"]}
    >
      {mapping[name as keyof typeof mapping]}
    </IconWrapper>
  );
};

export const setIconColor = (color: string, isImportant: boolean = false) => `
  svg g {
    &, path, circle, rect {
      stroke: ${color}${isImportant ? " !important" : ""};
    }

    rect {
      fill: ${color}${isImportant ? " !important" : ""};
    }

    tspan {
      stroke: transparent${isImportant ? " !important" : ""};
      fill: ${color}${isImportant ? " !important" : ""};
    }
  }

  svg > path {
    stroke: ${color}${isImportant ? " !important" : ""};
  }
`;

const IconWrapper = styled.div<
  Omit<IIconProps, "width" | "name"> & { iconWidth: number | undefined }
>`
  display: inline-block;
  cursor: ${({ onClick }) => (!!onClick ? "pointer" : "inherit")};

  > svg {
    ${({ iconWidth }) => iconWidth !== undefined && `width: ${iconWidth}px;`}
    height: 100%;
    display: block;
  }

  ${({ color, theme }) => color && setIconColor(theme.newColors[color], true)};
`;
