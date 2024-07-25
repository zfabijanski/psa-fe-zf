import styled, { CSSProp } from "styled-components";
import { CancelStatus } from "../../Survey.types";
import PruCheckbox from "components/UI/PruCheckbox/PruCheckbox";

interface IProps {
  cancellationStatus: CancelStatus;
  onChange: () => void;
  disabled: boolean;
  css?: CSSProp;
}

const StyledFooter = styled.div<{ css?: CSSProp }>`
  display: flex;
  flex-shrink: 0;
  margin: 24px 0 4px auto;
  ${(props) => props.css};
`;

export const Footer = ({
  cancellationStatus,
  onChange,
  disabled,
  css,
}: IProps) => {
  return (
    <StyledFooter css={css}>
      {cancellationStatus && (
        <PruCheckbox
          {...cancellationStatus}
          onChange={onChange}
          disabled={disabled}
          labelProps={{
            labelText: cancellationStatus?.label,
          }}
        />
      )}
    </StyledFooter>
  );
};

export default Footer;
