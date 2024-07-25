import React, { Component } from "react";
import styled from "styled-components";
import Product from "./Product";
import { IRow } from "./types";

interface ICalculatorRowProps {
  row: IRow;
  onClick(index: number): void;
  selected: number | null;
}

const RowHeader = styled.div`
  border: none;
  width: 10rem;
  float: left;
  color: white;
  margin: 0.5em;
  font-size: 18px;
`;

const CalRow = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  align-self: center;
  align-items: center;
  justify-content: center;
`;

class CalculatorRow extends Component<ICalculatorRowProps> {
  public clickHandler = (index: number) => {
    return () => this.props.onClick(index);
  };

  public render() {
    return (
      <CalRow>
        {this.props.row.header && (
          <RowHeader>{this.props.row.header}</RowHeader>
        )}
        {this.props.row.products.map((value, index) => (
          <Product
            key={index}
            data={value}
            onClick={this.clickHandler(index)}
            selected={this.props.selected === index}
          />
        ))}
      </CalRow>
    );
  }
}

export default CalculatorRow;
