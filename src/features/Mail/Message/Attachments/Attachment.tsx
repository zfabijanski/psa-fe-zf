import styled from "styled-components";
import { Icon } from "../../../../components/UI/Icon";

const AttachmentBox = styled.div`
  margin-top: 12px;
  width: 100%;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.newColors.gray30};
  position: relative;
  display: flex;
  justify-content: space-between;

  p {
    font-size: 16px;
    line-height: 1.21;
    color: ${({ theme }) => theme.newColors.gray100};
    margin: auto 0;
  }
`;

const RemoveIcon = styled(Icon)<Pick<IProps, "isStateChanging">>`
  cursor: ${({ isStateChanging }) => (isStateChanging ? "default" : "pointer")};
  margin-left: 11px;

  &:hover {
    opacity: ${({ theme }) => theme.opacityHover};
  }
`;

interface IProps {
  name: string;
  isRemovable: boolean;
  onRemoveClick: () => void;
  isStateChanging: boolean;
}

const Attachment = (props: IProps) => {
  const handleClick = () => {
    if (!props.isStateChanging) {
      props.onRemoveClick();
    }
  };

  return (
    <AttachmentBox>
      <p>{props.name}</p>
      {props.isRemovable && (
        <RemoveIcon
          name="trash-2"
          onClick={handleClick}
          isStateChanging={props.isStateChanging}
        />
      )}
    </AttachmentBox>
  );
};

export default Attachment;
