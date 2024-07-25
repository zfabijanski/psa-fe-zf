import React, { PropsWithChildren } from "react";
import styled from "styled-components";

const SectionDiv = styled.div`
  padding: 36px 48px 0px;

  &:last-child {
    padding-bottom: 36px;
  }
`;

interface IProps {
  shouldRender: boolean;
}

export const CoversSectionWrapper: React.FC<PropsWithChildren<IProps>> = ({
  shouldRender,
  children,
}) => <>{shouldRender && <SectionDiv>{children}</SectionDiv>}</>;
