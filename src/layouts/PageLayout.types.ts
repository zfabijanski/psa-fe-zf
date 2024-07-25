import { IButtonProps } from "components/UI/PruButton/PruButton";
import { ReactElement } from "react";
import * as buttonConfigs from "utils/buttonsPropsFactory";

export type PageFooterButtonConfig = keyof typeof buttonConfigs;

export type PageFooterButton =
  | IButtonProps
  | (Pick<IButtonProps, "onClick"> & {
      config: PageFooterButtonConfig;
      message?: string;
    });

export type PageFooterSection = PageFooterButton[] | ReactElement | false;

export type PageFooterConfig = {
  leftSection?: PageFooterSection;
  centerSection?: PageFooterSection;
  rightSection?: PageFooterSection;
  footerBlockerVisible?: boolean;
  transparent?: boolean;
  onFooterBlockerClick?(): void;
};
