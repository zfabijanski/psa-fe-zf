import styled from "styled-components";
import PruCheckbox from "components/UI/PruCheckbox/PruCheckbox";

interface IProps {
  checked: boolean;
  disabled: boolean;
  label: string;
  setValue: () => void;
}

const CheckBox = styled.div`
  display: grid;
  margin: 25px 0 5px;
`;

export const Checkbox = ({ checked, label, setValue, disabled }: IProps) => {
  const onChange = () => setValue();
  return (
    <CheckBox>
      <PruCheckbox
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        labelProps={{
          labelText: label,
        }}
      />
    </CheckBox>
  );
};

export default Checkbox;
