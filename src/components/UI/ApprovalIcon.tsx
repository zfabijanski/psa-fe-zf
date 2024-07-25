import React from "react";
import styled from "styled-components";
import PruIcon, { IPruIconProps } from "./PruIcon/PruIcon";

const StyledIcon = styled(PruIcon)`
  bottom: -11px;
  position: absolute;
  left: 50%;
  z-index: 1;
  transform: translate(-50%);
`;

export interface IApprovalIconProps extends Omit<IPruIconProps, "type"> {}

export const ApprovalIcon: React.FC<IApprovalIconProps> = (props) => (
  <StyledIcon type="check-white-green-rounded" {...props} />
);

export default ApprovalIcon;
