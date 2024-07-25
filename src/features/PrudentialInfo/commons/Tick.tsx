import React, { FC } from "react";
import TickIcon from "../../../assets/icons/tick.svg";

interface IProps {
  displayTick?: boolean;
}

const Tick: FC<IProps> = ({ displayTick }) => {
  return <div>{displayTick && <img src={TickIcon} alt={"tick"} />}</div>;
};

export default Tick;
