import React from "react";
import { MessageDescriptor } from "react-intl";
import styled from "styled-components";
import Overflower from "../../../../../components/Overflower";
import { useI18n } from "../../../../../utils/i18n";
import Text from "./Text";

const Row = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 10px 10px 10px 15px;

  @media only screen and (min-width: 1366px) {
    margin: 10px 15px 10px 15px;
  }
`;

const Indicator = styled.div<Pick<ISection, "isAdequate">>`
  position: absolute;
  width: 12px;
  height: 12px;
  top: 3px;
  right: -3px;
  border-radius: 50%;
  background-color: ${({ isAdequate }) => {
    switch (isAdequate) {
      case true:
        return ({ theme }) => theme.newColors.success;
      case false:
        return ({ theme }) => theme.newColors.error;
      default:
        return ({ theme }) => theme.colors.transparent;
    }
  }};
`;

const SectionText = styled(Text)`
  color: ${({ theme }) => theme.newColors.gray80};
`;

const DigitText = styled(Text)`
  font-weight: 600;
`;
export interface ISection {
  title: MessageDescriptor;
  shortTitle?: MessageDescriptor;
  value: MessageDescriptor | string | number | null;
  isAdequate?: boolean | null;
}

const Section: React.FC<ISection> = ({
  title,
  shortTitle,
  value,
  isAdequate,
}) => {
  if (value && typeof value === "object" && !value.id) {
    value = { id: "???" }; // prevent crashing when translation id is falsy
  }
  const i18n = useI18n();
  const titleTranslated = i18n.formatMessage({ id: title.id });
  return (
    <Row>
      <SectionText>
        {shortTitle ? (
          <Overflower
            longText={titleTranslated}
            shortText={i18n.formatMessage({ id: shortTitle.id })}
          />
        ) : (
          titleTranslated
        )}
      </SectionText>
      <DigitText>{i18n.messageToString(value)}</DigitText>
      {isAdequate !== undefined && isAdequate !== null && (
        <Indicator isAdequate={isAdequate} />
      )}
    </Row>
  );
};

export default Section;
