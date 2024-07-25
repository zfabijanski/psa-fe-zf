import defer from "lodash/defer";
import React, { useMemo } from "react";
import { redirect } from "../../../../utils/router";
import { IIllustration } from "../../types";
import AddIllustration from "./AddIllustration";
import Illustration from "./Illustration/Illustration";

interface IProps {
  illustrations: IIllustration[];
  previewIllustration: (calculationId: number) => void;
  removeIllustration: (calculationId: number) => void;
  openCalculation: (index?: number) => void;
  onIllustrationClick: () => void;
  isActive: boolean;
  isInLastProduct: boolean;
  colors: string[];
}

export const Illustrations: React.FC<IProps> = (props) => {
  const bindAction =
    (action: (calculationId: number) => void, calculationId: number) => () =>
      action(calculationId);

  const newCalculationIndex = useMemo(
    () => props.illustrations.filter((x) => x.order_id).length,
    [props.illustrations]
  );

  const openCalculator =
    (index = newCalculationIndex) =>
    async () => {
      await props.openCalculation(index);
      defer(() => redirect("/calculator"));
    };

  return (
    <>
      {props.illustrations.length < 3 && (
        <AddIllustration onClick={openCalculator()} />
      )}
      {props.illustrations.map(
        (illustration: IIllustration, idx) =>
          illustration.pru_calc_calculation_id !== null && (
            <Illustration
              key={idx}
              isActive={props.isActive}
              isInLastProduct={props.isInLastProduct}
              isFirstIllustration={idx === 0}
              illustration={illustration}
              color={props.colors[idx]}
              onClick={props.onIllustrationClick}
              preview={bindAction(
                props.previewIllustration,
                illustration.pru_calc_calculation_id
              )}
              edit={openCalculator(idx)}
              remove={bindAction(
                props.removeIllustration,
                illustration.pru_calc_calculation_id
              )}
            />
          )
      )}
    </>
  );
};

export default Illustrations;
