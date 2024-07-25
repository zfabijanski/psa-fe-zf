import React, { useEffect, useRef } from "react";
import { useIntl } from "react-intl";
import scrollIntoView from "scroll-into-view-if-needed";
import styled from "styled-components";
import { IIllustration } from "../../../types";
import ActionButtons from "./ActionButtons";
import Section from "./Section";
import Text from "./Text";
import { getVisibleFields } from "./visibleFields";

const RelativeContainer = styled.div`
  position: relative;
  width: 100%;
`;

const AbsoluteContainer = styled.div<Pick<IProps, "isInLastProduct">>`
  position: absolute;
  left: 0;
  right: 0;
  top: ${({ isInLastProduct }) => (isInLastProduct ? "unset" : 0)};
  bottom: ${({ isInLastProduct }) => (isInLastProduct ? 0 : "unset")};
`;

const ScrollingIntoViewReference = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  margin: -20px 0;
`;

const IllustrationContainer = styled.div<Pick<IProps, "isActive">>`
  cursor: pointer;
  height: auto;
  overflow: hidden;
  background-color: ${({ theme }) => theme.newColors.white100};
  display: grid;
  grid-template-rows: 32px 2px 1fr;
  height: ${({ isActive }) => (isActive ? "auto" : "180px")};

  > * {
    overflow: hidden;
  }

  &:hover {
    opacity: ${({ theme, isActive }) => (isActive ? 1 : theme.opacityHover)};
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  height: 100%;
  text-transform: uppercase;
`;

const Divider = styled.div<Pick<IProps, "color">>`
  background-color: ${({ color }) => color};
`;

const IllustrationNoText = styled(Text)<Pick<IProps, "color">>`
  display: inline;
  overflow: hidden;
  font-size: 16px;
  line-height: 32px;
  height: inherit;
  font-weight: 600;
  text-overflow: ellipsis;
  color: ${({ color }) => color};
`;

const AdequacyText = styled(Text)`
  display: inline;
  overflow: hidden;
  line-height: 32px;
  height: inherit;
  font-weight: 600;
  flex-shrink: 0;
  padding-left: 8px;

  &:after {
    content: "";
    margin-left: 8px;
    border: 6px solid;
    border-radius: 100px;
    display: inline-block;
  }
`;

const SectionsContainer = styled.div`
  overflow: hidden;
`;

interface IProps {
  illustration: IIllustration;
  color: string;
  isActive: boolean;
  edit: () => void;
  preview: () => void;
  remove: () => void;
  onClick: () => void;
  isInLastProduct: boolean;
  isFirstIllustration: boolean;
}

const Illustration: React.FC<IProps> = (props) => {
  const intl = useIntl();
  const { illustration } = props;
  const illustrationFields = getVisibleFields(illustration);

  const containerRef = useRef<HTMLDivElement>(null);

  const illustrationNumberText = intl.formatMessage(
    { id: "piwAndBop.illustrationNumber" },
    { number: illustration.order_id }
  );
  const adequacyText = intl.formatMessage({
    id: illustration.calculation_is_adequate
      ? "piwAndBop.adequate"
      : "piwAndBop.inadequate",
  });

  useEffect(() => {
    if (containerRef.current && props.isActive && props.isFirstIllustration) {
      scrollIntoView(containerRef.current, {
        scrollMode: "if-needed",
        block: "nearest",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isActive]);

  return (
    <RelativeContainer>
      <AbsoluteContainer
        isInLastProduct={props.isInLastProduct}
        className="shadowable"
      >
        <ScrollingIntoViewReference ref={containerRef} />
        <IllustrationContainer
          onClick={props.onClick}
          isActive={props.isActive}
        >
          <Header title={`${illustrationNumberText} - ${adequacyText}`}>
            <IllustrationNoText color={props.color}>
              {illustrationNumberText}
            </IllustrationNoText>
            {illustration.calculation_is_adequate !== null && (
              <AdequacyText
                textAlign="right"
                isAdequate={illustration.calculation_is_adequate}
              >
                {adequacyText}
              </AdequacyText>
            )}
          </Header>
          <Divider color={props.color} />
          <SectionsContainer>
            {illustrationFields.slice(0, 3).map((section, idx) => (
              <Section key={idx} {...section} />
            ))}
            {props.isActive &&
              illustrationFields
                .slice(3)
                .map((section, idx) => <Section key={idx} {...section} />)}
          </SectionsContainer>
          {props.isActive && (
            <ActionButtons
              orderId={illustration.order_id}
              remove={props.remove}
              edit={props.edit}
              preview={props.preview}
            />
          )}
        </IllustrationContainer>
      </AbsoluteContainer>
    </RelativeContainer>
  );
};

export default Illustration;
