import React, { FC, useState } from "react";
import styled from "styled-components/macro";
import PageElementWrapper from "../../../../../components/UI/PageElementWrapper";
import ViewContainer from "../../../commons/ViewContainer";
import InfoDialog from "./InfoDialog";
import NavigationColumn from "./NavigationColumn";
import { promotionDetails } from "./promotionCriteriaConfig";
import { Role } from "./types";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 1fr;
  height: 100%;

  @media only screen and (max-width: 1024px) {
    grid-template-columns: 1fr 2fr;
  }
`;

interface IProps {
  title: string;
  subtitle: string;
}

const PromotionCriteria: FC<IProps> = ({ title, subtitle }) => {
  const [activeRole, setActiveRole] = useState<Role>("managerIntern");
  const showRoleDetails = (role: Role) => setActiveRole(role);
  return (
    <PageElementWrapper>
      <ViewContainer title={title} subtitle={subtitle}>
        <Container>
          <NavigationColumn
            showRoleDetails={showRoleDetails}
            activeRole={activeRole}
          />
          <InfoDialog details={promotionDetails[activeRole]} />
        </Container>
      </ViewContainer>
    </PageElementWrapper>
  );
};

export default PromotionCriteria;
