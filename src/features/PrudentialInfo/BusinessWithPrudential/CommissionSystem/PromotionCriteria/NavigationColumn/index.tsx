import React, { FC } from "react";
import styled from "styled-components/macro";
import { Role } from "../types";
import NavigationRow from "./NavigationRow";

import ArrowUpIcon from "../../../../../../assets/icons/arrow-up-red-bg.svg";
import ConsultantIcon from "../../../../../../assets/icons/consultant-icon.svg";
import DirectorIcon from "../../../../../../assets/icons/director-icon.svg";
import ManagerIcon from "../../../../../../assets/icons/manager-icon.svg";
import ManagerInternIcon from "../../../../../../assets/icons/manager-intern-icon.svg";
import SeniorDirectorIcon from "../../../../../../assets/icons/senior-director-icon.svg";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(4, 1fr) 70px;
  white-space: pre-wrap;
  padding-top: 22px;

  @media only screen and (max-width: 1280px) {
    height: 360px;
    grid-template-rows: repeat(4, 1fr) 50px;
    padding-top: 10px;
    align-self: center;
    span {
      font-size: 15px;
    }
    img {
      width: 70%;
      justify-self: center;
    }
  }

  @media only screen and (max-width: 1024px) {
    height: 80%;
  }
`;

const ArrowContainer = styled.div<{ displayIndicator?: boolean }>`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 4px 0 4px;
  img {
    margin: 0 10px;
    cursor: pointer;
  }
  &::after {
    content: "";
    width: 0;
    height: 0;
    border-right: 30px solid
      ${({ theme, displayIndicator }) =>
        displayIndicator ? theme.newColors.gray100 : "transparent"};
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
    position: absolute;
    bottom: 3px;
    right: -50px;
    z-index: 10;

    @media only screen and (max-width: 1024px) {
      right: -30px;
    }
  }
  @media only screen and (max-width: 1280px) {
    margin: 0;
    img {
      width: 50%;
      margin: 3px 19px;
    }
  }
  @media only screen and (max-width: 1024px) {
    margin: 4px 0 4px;
    img {
      margin-right: 16px;
    }
  }
`;

const ImgContainer = styled.div`
  height: 40px;
  width: 51px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 1280px) {
    height: 33px;
    margin-top: 5px;
  }
`;

interface IProps {
  activeRole: Role;
  showRoleDetails: (role: Role) => void;
}

const labels: Array<{ label: string; icon: string; role?: Role }> = [
  {
    label: "commissionSystem.promotionCriteria.seniorDirector.label",
    icon: SeniorDirectorIcon,
    role: "seniorDirector",
  },
  {
    label: "commissionSystem.promotionCriteria.director.label",
    icon: DirectorIcon,
    role: "director",
  },
  {
    label: "commissionSystem.promotionCriteria.manager.label",
    icon: ManagerIcon,
    role: "manager",
  },
  {
    label: "commissionSystem.promotionCriteria.managerIntern.label",
    icon: ManagerInternIcon,
    role: "managerIntern",
  },
  {
    label: "commissionSystem.promotionCriteria.consultant.label",
    icon: ConsultantIcon,
  },
];

const NavigationColumn: FC<IProps> = ({ showRoleDetails, activeRole }) => {
  const handleClick = (role?: Role) => () =>
    showRoleDetails(role || "consultant");
  return (
    <Container>
      {labels.map((elt, index) => (
        <div key={`row${elt.label}`}>
          <NavigationRow {...elt} />
          {index !== labels.length - 1 && (
            <ArrowContainer displayIndicator={activeRole === elt.role}>
              <ImgContainer>
                <img
                  src={ArrowUpIcon}
                  alt={"arrow-up"}
                  onClick={handleClick(elt.role)}
                />
              </ImgContainer>
            </ArrowContainer>
          )}
        </div>
      ))}
    </Container>
  );
};

export default NavigationColumn;
