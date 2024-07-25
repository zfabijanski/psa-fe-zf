import React from "react";
import { Tile } from "../Tile";
import { plMoney } from "./plMoney";
import { IProduct } from "./types";

interface IProductProps {
  selected: boolean;
  data: IProduct;
  onClick(): void;
}

const Product: React.FunctionComponent<IProductProps> = (props) => {
  return (
    <Tile onClick={props.onClick} selected={props.selected}>
      {props.selected ? (
        <>
          <p>{props.data.desc}</p>
          <p>{plMoney(props.data.cost)}</p>
        </>
      ) : (
        <>
          {props.data.icon}
          <p>{props.data.desc}</p>
        </>
      )}
    </Tile>
  );
};

export default Product;
