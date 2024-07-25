import React from "react";
import styled from "styled-components";
import PruIcon from "../../../components/UI/PruIcon/PruIcon";

interface IProps {
  onClick: (event: React.MouseEvent) => void;
  disabled?: boolean;
  className?: string;
}

interface IState {
  hover: boolean;
}

const PruIconWrapper = styled(PruIcon)`
  cursor: pointer;

  img {
    display: block;
    margin: auto;
  }
`;

const DisabledPruIconWrapper = styled(PruIconWrapper)`
  opacity: 0.3;
  pointer-events: none;
  cursor: default;
  text-decoration: none;
`;

export class RemoveButton extends React.Component<IProps, IState> {
  public state: IState = {
    hover: false,
  };

  private handleMouseEnter = () =>
    this.setState({
      hover: true,
    });

  private handleMouseLeave = () =>
    this.setState({
      hover: false,
    });

  public render(): React.ReactNode {
    return (
      <>
        {this.props.disabled ? (
          <DisabledPruIconWrapper
            type={"trash-black"}
            className={this.props.className}
          />
        ) : (
          <PruIconWrapper
            type={this.state.hover ? "trash-black-hover" : "trash-black"}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            onClick={this.props.onClick}
            className={this.props.className}
          />
        )}
      </>
    );
  }
}
