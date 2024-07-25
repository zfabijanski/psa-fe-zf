import { Box, Flex } from "components/UI/Box";
import PruButton from "components/UI/PruButton/PruButton";
import { PageFooterConfig, PageFooterSection } from "layouts/PageLayout.types";
import { FC } from "react";
import styled from "styled-components";
import * as buttonConfigs from "utils/buttonsPropsFactory";

const HeightContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  min-height: 80px;
  display: flex;
`;

const FooterBlocker = styled.div.attrs({
  "data-testid": "footer-blocker",
})`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 55;
  left: 0;
  right: 0;
  bottom: 0;
  height: 80px;
`;

const FooterWrapper = styled.div.attrs({
  "data-testid": "footer-wrapper",
})<Pick<IFooterProps, "transparent">>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  bottom: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  margin: 0;
  background-color: ${({ transparent, theme }) =>
    transparent ? "transparent" : theme.newColors.white100};
  z-index: 50;
`;

const MaxWidthRow = styled(Flex)`
  width: 100%;
  margin: auto;
  padding: 0 48px;
`;
const FooterColumn = styled(Box)({
  width: "33.33%",
});

const SectionContainer = styled.div`
  width: 100%;
  display: flex;
  white-space: nowrap;
`;

const LeftSectionContainer = styled(SectionContainer)`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

const CenterSectionContainer = styled(SectionContainer)`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ButtonsRow = styled.div`
  position: relative;
  display: flex;
  gap: 12px;
`;

const RightSectionContainer = styled(({ children, className }) => (
  <SectionContainer className={className}>
    <ButtonsRow>{children}</ButtonsRow>
  </SectionContainer>
))`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export interface IFooterProps extends PageFooterConfig {}

const renderSection = (section?: PageFooterSection) => {
  if (!section) {
    return null;
  }

  if (Array.isArray(section)) {
    return (
      <>
        {section.map((buttonOrConfig, index) => {
          let buttonProps = {};

          if ("config" in buttonOrConfig) {
            const { config, message, ...rest } = buttonOrConfig;
            const _buttonConfig = buttonConfigs[config];

            if (typeof _buttonConfig === "function") {
              buttonProps = {
                ..._buttonConfig(message),
                ...rest,
              };
            }

            if (typeof _buttonConfig === "object") {
              buttonProps = {
                ..._buttonConfig,
                ...rest,
              };
            }
          } else {
            buttonProps = { ...buttonOrConfig };
          }

          return <PruButton key={index} {...buttonProps} />;
        })}
      </>
    );
  }

  return section;
};

export const Footer: FC<IFooterProps> = (props) => (
  <HeightContainer data-testid="footer">
    {props.footerBlockerVisible && (
      <FooterBlocker onClick={props.onFooterBlockerClick} />
    )}
    <FooterWrapper transparent={props.transparent}>
      <MaxWidthRow>
        <FooterColumn>
          <LeftSectionContainer>
            {renderSection(props.leftSection)}
          </LeftSectionContainer>
        </FooterColumn>
        <FooterColumn>
          <CenterSectionContainer>
            {renderSection(props.centerSection)}
          </CenterSectionContainer>
        </FooterColumn>
        <FooterColumn>
          <RightSectionContainer>
            {renderSection(props.rightSection)}
          </RightSectionContainer>
        </FooterColumn>
      </MaxWidthRow>
    </FooterWrapper>
  </HeightContainer>
);

export default Footer;
