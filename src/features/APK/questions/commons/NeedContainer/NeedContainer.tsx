import { FC, ReactNode, useState } from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components/macro";
import PruButton from "../../../../../components/UI/PruButton/PruButton";
import PruCheckbox from "../../../../../components/UI/PruCheckbox/PruCheckbox";
import { IClientNeed, ISetQuestionValue } from "../../../types";
import { useProlongUserSessionMutation } from "slices/auth";

interface IProps extends IClientNeed, ISetQuestionValue {
  titleElement: (isExpanded: boolean) => ReactNode;
  isExpandable: boolean;
  expandableElement: ReactNode;
  image: string;
  onExpandChange?: (isExpand: boolean) => void;
  openModal?: () => void;
}

const NeedContainer: FC<IProps> = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [prolongUserSession] = useProlongUserSessionMutation();

  const toggleIsExpanded = () => {
    if (props.isExpandable) {
      setIsExpanded((wasExpanded) => {
        const isExpandedNow = !wasExpanded;
        if (props.onExpandChange) {
          props.onExpandChange(isExpandedNow);
        }
        return isExpandedNow;
      });
    } else {
      if (props.openModal) {
        props.openModal();
      }
    }
    prolongUserSession();
  };

  const toggleShouldMoveValueToCalculator = () => {
    props.setQuestionValue(
      "moveValueToCalculator",
      !props.moveValueToCalculator
    );
  };

  return (
    <Wrapper>
      <Card>
        <Image src={props.image} />
        <Title>{props.titleElement(isExpanded)}</Title>
        <Main>
          <div>
            <PruCheckbox
              checked={props.moveValueToCalculator}
              onChange={toggleShouldMoveValueToCalculator}
              hideValidationInfo
              labelProps={{
                labelTrKey: "apk.label.moveValueToCalculator",
              }}
            />
          </div>
          <StyledPruButton
            buttonType="secondary"
            icon={isExpanded ? "chevron-up" : "chevron-down"}
            children={<FormattedMessage id="apk.label.showDetails" />}
            onClick={toggleIsExpanded}
          />
        </Main>
      </Card>
      {isExpanded && (
        <ExpandableContainer>{props.expandableElement}</ExpandableContainer>
      )}
    </Wrapper>
  );
};

export default NeedContainer;

const Wrapper = styled.div`
  margin-bottom: 30px;
  background-color: ${({ theme }) => theme.newColors.white100};
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: 600;
  line-height: 40px;
  color: ${({ theme }) => theme.newColors.gray100};
  position: relative;
`;

const Card = styled.div`
  position: relative;
  height: 190px;
  padding: 30px;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 20px -5px rgba(0, 0, 0, 0.1),
    0 6px 30px 5px rgba(0, 0, 0, 0.05), 0 16px 24px 2px rgba(0, 0, 0, 0.05);
  background-color: ${({ theme }) => theme.newColors.white100};
  display: flex;
  flex-direction: column;
`;

const Main = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: auto;
`;

const StyledPruButton = styled(PruButton)`
  &:hover svg path {
    stroke: ${({ theme }) => theme.newColors.primary100};
  }
`;

const ExpandableContainer = styled.div``;

const Image = styled.img`
  top: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  overflow: hidden;
  height: 100%;
  opacity: ${({ theme }) => theme.opacityHover};
  object-fit: cover;
`;
