import { FC, ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import PruText from "../../../components/UI/PruText/PruText";

interface IProps {
  translationKey?: string;
  text?: string;
  fontSize: 12 | 14 | 16 | 18 | 20 | 22 | 24 | 26 | 28;
  fontWeight?: string;
  lineHeight?: number;
  values?: Record<string, ReactNode>;
  className?: string;
}

const TextContainer: FC<IProps> = ({
  translationKey,
  text,
  fontWeight,
  lineHeight,
  fontSize,
  values,
  className,
}) => (
  <PruText
    fontWeight={fontWeight}
    fontSize={fontSize}
    lineHeight={lineHeight}
    className={className}
  >
    {translationKey && <FormattedMessage id={translationKey} values={values} />}
    {text}
  </PruText>
);

export default TextContainer;
