import styled from "styled-components";
import { Icon } from "../../../../components/UI/Icon";
import { Direction, IDirectory, IDirectoryMetadata } from "../../types";
import DocumentContainer from "../Document";
import DirectoryContainer from "./index";

const Container = styled.div`
  margin-left: 12px;
`;

const Wrapper = styled.div`
  margin-bottom: 28px;
`;

const DirectoryHeader = styled.div<Pick<IProps, "level">>`
  font-weight: ${({ level }) => (level === 0 ? 600 : 400)};
  color: ${({ theme }) => theme.newColors.gray100};
  font-size: 16px;
  text-transform: uppercase;
  line-height: 20px;
  position: relative;
  cursor: pointer;
  &:focus,
  :hover {
    opacity: 0.8;
  }
`;
const DirectoryHeaderSuffix = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

const StyledIcon = styled(Icon)<{ level: number; direction: Direction }>`
  transform: scaleY(
    ${({ direction }) => (direction === Direction.Up ? -1 : 1)}
  );

  & path {
    stroke: ${({ theme, level, direction }) =>
      level === 0 || direction === Direction.Up
        ? theme.newColors.secondary100
        : theme.newColors.gray60};
  }
`;

interface IProps {
  level: number;
  directory: IDirectory & IDirectoryMetadata;
  onToggle: (directoryId: number) => void;
}

const Directory = ({ level = 0, directory, onToggle }: IProps) => {
  const handleToggle = () => {
    onToggle(directory.directoryId);
  };

  return (
    <Wrapper>
      <DirectoryHeader onClick={handleToggle} level={level}>
        {directory.name}
        <DirectoryHeaderSuffix>
          <StyledIcon
            name="chevron-down-3"
            level={level}
            direction={directory.isOpen ? Direction.Up : Direction.Down}
          />
        </DirectoryHeaderSuffix>
      </DirectoryHeader>
      {directory.isOpen && (
        <Container>
          <>
            {(directory.documentsIds || []).map((documentId) => (
              <DocumentContainer key={documentId} documentId={documentId} />
            ))}
            {(directory.directories || []).map((subdirectory) => (
              <DirectoryContainer
                key={subdirectory.directoryId}
                directory={subdirectory}
                level={level + 1}
              />
            ))}
          </>
        </Container>
      )}
    </Wrapper>
  );
};

export default Directory;
