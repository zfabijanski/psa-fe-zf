import { IButtonProps } from "components/UI/PruButton/PruButton";
import { FormattedMessage } from "react-intl";

export const getArrowNextConfig = (id?: string): Partial<IButtonProps> => ({
  icon: "arrow-right",
  iconPosition: "right",
  children: <FormattedMessage id={id} />,
});

export const apkButtonConfig: Partial<IButtonProps> = {
  buttonType: "secondary",
  children: <FormattedMessage id="apk.title" />,
};

export const iddButtonConfig: Partial<IButtonProps> = {
  buttonType: "secondary",
  children: <FormattedMessage id="idd.title" />,
};

export const prevButtonConfig: Partial<IButtonProps> = {
  buttonType: "secondary",
  icon: "arrow-left",
  children: <FormattedMessage id="bottomButtonBar.back" />,
};

export const calculateButtonConfig: Partial<IButtonProps> = {
  buttonType: "secondary",
  htmlType: "submit",
  children: <FormattedMessage id="bottomButtonBar.calculate" />,
};
