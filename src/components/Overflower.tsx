import React from "react";
import { MessageDescriptor } from "react-intl";
import styled from "styled-components";
import { textEllipsis } from "../theme/textEllipsis";
import { useI18n } from "../utils/i18n";

const Container = styled.span`
  display: inline-flex;
  flex-wrap: wrap;
  height: 1.5em;

  box-sizing: border-box;
  max-width: 100%;
  ${textEllipsis};
`;

const ShortText = styled.span`
  display: block;
  overflow: hidden;
  flex-grow: 1;
  width: 0;
  text-overflow: ellipsis;
`;

const LongText = styled.span`
  display: inline;
  flex-basis: 100%;
`;

export interface IOverflowerProps {
  shortText: string | MessageDescriptor;
  longText: string | MessageDescriptor;
}

export const Overflower: React.FC<IOverflowerProps> = (props) => {
  const i18n = useI18n();

  const translateShortText = () => {
    if (typeof props.shortText === "string") {
      return props.shortText;
    } else {
      if (props.shortText.id && i18n.messages[props.shortText.id]) {
        return i18n.messageToString(props.shortText);
      } else {
        return props.shortText.id;
      }
    }
  };

  return (
    <Container>
      <ShortText>{translateShortText()}</ShortText>
      <LongText>{i18n.messageToString(props.longText)}</LongText>
    </Container>
  );
};

export default Overflower;
