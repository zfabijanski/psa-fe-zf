export interface IProduct {
  cost: number;
  desc: string;
  icon: JSX.Element;
}

export interface IRow {
  header?: string;
  products: IProduct[];
}
