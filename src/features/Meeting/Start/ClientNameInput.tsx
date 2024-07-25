import styled from "styled-components";
import { Input } from "../../../components/UI/Input";

const StyledInput = styled.div`
  width: 360px;
  margin: 32px auto;
`;

interface IProps {
  value: string;
  shouldFocus: boolean;
  onChange: (value: string) => void;
  onBlur: (value: string) => void;
}

const ClientNameInput = (props: IProps) => (
  <StyledInput>
    <Input
      labelProps={{
        labelTrKey: "startNewMeeting.label.newMeetingWith",
      }}
      placeholder="startNewMeeting.placeholder.name"
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      autoFocus
    />
  </StyledInput>
);

export default ClientNameInput;
