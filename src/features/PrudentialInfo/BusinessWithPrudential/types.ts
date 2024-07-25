import { TIconType } from "../../../components/UI/Icon";
import { StartSlide } from "slices/businessWithPrudential";
import { HoverPathKey } from "../../Start/Tile";

export interface IBusinessWithPrudentialButton {
  label: string;
  icon: TIconType;
  startSlidesFrom: StartSlide;
  hoverPathKey?: HoverPathKey;
}
