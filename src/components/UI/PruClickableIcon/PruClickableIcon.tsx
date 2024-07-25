import styled from "styled-components";
import PruIcon from "../PruIcon/PruIcon";

export interface IPruClickableIconProps {
  disabled?: boolean;
}

export const PruClickableIcon = styled(PruIcon)<IPruClickableIconProps>`
  img {
    cursor: ${({ disabled }) => (disabled ? "unset" : "pointer")};
    opacity: ${({ theme, disabled }) => (disabled ? theme.opacityDisabled : 1)};
    :hover {
      opacity: ${({ theme, disabled }) =>
        disabled ? theme.opacityDisabled : theme.opacityHover};
    }
  }
`;

export default PruClickableIcon;
