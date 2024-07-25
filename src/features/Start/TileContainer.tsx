import styled from "styled-components/macro";
import { FormattedMessage } from "react-intl";
import { Brand } from "slices/auth";
import Tile from "./Tile";

export const StartButtons = styled.div`
  margin: 32px auto;
  padding-top: 40px;
  display: flex;
  width: 100%;
  max-width: 918px;
  border-top: 1px solid ${({ theme }) => theme.newColors.gray30};
`;

const Column = styled.div`
  width: 50%;
  margin: 6px;
`;

const ColumnTitle = styled.p`
  font-size: 18px;
  line-height: 24px;
  color: ${({ theme }) => theme.newColors.primary100};
  margin-bottom: 12px;
`;
interface IProps {
  brand?: Brand;
  onNewMeetingClick: () => void;
  onLoadMeetingClick: () => void;
  onLibraryClick: () => void;
  onAboutClick: () => void;
  onBusinessClick: () => void;
}

const Tiles = (props: IProps) => {
  return (
    <StartButtons>
      <Column>
        <ColumnTitle>
          <FormattedMessage id={"start.label.meetings"} />
        </ColumnTitle>
        <Tile
          onClick={props.onNewMeetingClick}
          isLarge
          icon="handshake"
          label={"start.label.newMeeting"}
        />
        <Tile
          onClick={props.onLoadMeetingClick}
          icon="group"
          label={"start.label.meetingLoad"}
        />
      </Column>
      <Column>
        <ColumnTitle>
          <FormattedMessage id={"start.label.knowledgeBase"} />
        </ColumnTitle>
        <Tile
          onClick={props.onAboutClick}
          hoverPathKey="fill"
          icon="pru-logo"
          label={"start.label.about"}
        />
        <Tile
          onClick={props.onLibraryClick}
          icon="library"
          label={"start.label.library"}
        />
        {props.brand === Brand.BrandPP && (
          <Tile
            onClick={props.onBusinessClick}
            icon="people"
            label={"start.label.business"}
          />
        )}
      </Column>
    </StartButtons>
  );
};

export default Tiles;
