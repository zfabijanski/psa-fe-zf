import { MessageDescriptor, useIntl } from "react-intl";
import styled from "styled-components";
import { Input } from "../../../components/UI/Input";

const placeholderSearch: MessageDescriptor = {
  id: "library.placeholder.search",
};

interface ISearchProps {
  value: string;
  onChange: (value: string) => void;
}

const StyledInput = styled(Input)`
  font-size: 16px;
  line-height: 20px;
`;

const Search = ({ value, onChange }: ISearchProps) => {
  const intl = useIntl();

  return (
    <StyledInput
      placeholder={intl.formatMessage(placeholderSearch)}
      iconName="search"
      iconPosition="left"
      value={value}
      onChange={onChange}
      hideEmptyValidations
    />
  );
};

export default Search;
